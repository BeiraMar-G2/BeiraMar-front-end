import Calendar from "react-calendar";
import { useState } from "react";
import "../Styles/calendario.css";
import 'react-calendar/dist/Calendar.css';
import api from "../../Provider/api";
import { useEffect } from "react";
import { Header } from "../../Components/Header";
import { FaHouse } from "react-icons/fa6";
import { Titulo, Subtitulo } from "../../Components/Fontes";
import { Botao } from "../../Components/Botao";
import { useNavigation } from "../../Hooks/useNavigation";
import { useLocation } from "react-router-dom";

export function AgendamentoServicoPacote() {
    const { handleNavigate } = useNavigation();
    const [mesAtual, setMesAtual] = useState(null);
    const [diasAgendados, setDiasAgendados] = useState([]);
    const [diaSelecionado, setDiaSelecionado] = useState(null);
    const [dataEscolhida, setDataEscolhida] = useState({});
    const location = useLocation();
    const { servicoEscolhido: inicial } = location.state || {};
    const [servicoEscolhido, setServicoEscolhido] = useState(inicial || {});
    const [tipo, setTipo] = useState(servicoEscolhido.tipo);
    const [horarioOcupado, setHorarioOcupado] = useState([]);
    const [servicos, setServicos] = useState([
        {
            id: 1,
            nome: "Massagem Relaxante",
            duracao: "60 min",
            preco: 120,
        },
    ]);

    function handleDiaSelecionado(date) {
        const dia = date.getDate().toString().padStart(2, '0');
        const mes = (date.getMonth() + 1).toString().padStart(2, '0');
        const ano = date.getYear() + 1900;
        setDataEscolhida({ dia: dia, mes: mes, ano: ano, formato: `${ano}-${mes}-${dia}` });
        setDiaSelecionado(`${dia}/${mes}`);
    }

    function buscarAgendamentos() {
        api.get("/agendamentos")
            .then((response) => {
                const agendamentos = response.data.map(dataAgendamento => {
                    if (dataAgendamento.dtHora) {
                        if (dataAgendamento.status === "Agendado") {
                            horarioOcupado.push(dataAgendamento.dtHora);
                        }
                        return dataAgendamento.dtHora.split("T")[0];
                    }
                    return null;
                });
                setDiasAgendados(agendamentos);
            }
            )
        tipo === "Pacotes" ? 
        api.get(`/sessoes/buscar/${servicoEscolhido.pacoteId}`)
            .then((response) => {
                console.log(response.data.map(sessao => ({
                    idServico: sessao.idServico,
                    nome: sessao.nome,
                    duracao: sessao.duracao,
                    preco: sessao.preco
                })));
                setServicos(response.data.map(sessao => ({
                    idServico: sessao.idServico,
                    nome: sessao.nome,
                    duracao: sessao.duracao,
                    preco: sessao.preco
                })))
        }) 

                : console.log(servicoEscolhido);
    }

    useEffect(() => {
        buscarAgendamentos();
        const hoje = new Date();
        setMesAtual(hoje.getMonth());
    }, []);


    return (
        <div className="agendamento-container">
            <Header
                alinhamento="flex-start"
                padding="0 10px"
                icone={<FaHouse size={28} />}
                cor="#CE2D4F"
                texto="Menu"
                color="#f8f8f8"
                isCliente="true"
            />

            <Subtitulo texto="Serviço Escolhido:" />
            <Titulo texto={
                servicoEscolhido.tipo === "Pacotes" ?
                    <></>
                    :
                    servicoEscolhido.servicoNome
            } />

            {servicoEscolhido.tipo === "Pacotes" ?
                <select
                    className="w-64 border rounded-lg p-2 mb-2"
                    onChange={(e) => {
                    const servicoSelecionado = servicos.find(s => s.idServico === Number(e.target.value));
                    setTipo(e.target.value);
                    if (servicoSelecionado) {
                        setServicoEscolhido({
                            ...servicoEscolhido,
                            servicoId: servicoSelecionado.idServico,
                            servicoNome: servicoSelecionado.nome,
                            servicoDuracao: servicoSelecionado.duracao,
                            servicoPreco: servicoSelecionado.preco
                        });
                    }
                }}
                >
                    {servicos.map((servico) => (
                        <option key={servico.idServico} value={servico.idServico}>{servico.nome}</option>
                    ))}
                    <option value="" selected disabled>Selecione um Serviço</option>
                </select>
                :
                <></>
            }

            <div className="calendario-wrapper">
                <Calendar
                    onActiveStartDateChange={({ activeStartDate, view }) => {
                        if (view === "month") {
                            const mes = activeStartDate.getMonth();
                            setMesAtual(mes);
                        }
                    }}
                    onClickDay={handleDiaSelecionado}
                    tileClassName={({ date, view }) => {
                        if (view === "month") {
                            const dataFormatada = date.toISOString().split("T")[0];

                            if (diasAgendados.includes(dataFormatada)) {
                                return "dia-agendado";
                            } else if (date.getMonth() === mesAtual) {
                                return "dia-vago";
                            }
                        }
                    }}
                    className={"calendario"} />

                <div className="legenda-agendamentos">
                    <div className="legenda-wrapper">
                        <div className="legenda vermelho">
                            .
                        </div>
                        <span> Dias com horários agendados </span>
                    </div>
                    <div className="legenda-wrapper">
                        <div className="legenda azul">
                            .
                        </div>
                        <span> Dias com agendamentos livres </span>
                    </div>
                </div>
            </div>

            <div className="detalhes-dia">
                <span>Dia Selecionado: {diaSelecionado} </span>
            </div>

            <hr />

            <div className="botoes-acao">
                <Botao texto="Voltar" cor="#C8C5C5" onClick={() => handleNavigate(-1)} />
                <Botao texto="Continuar" cor="#f8c7ccbb" onClick={() => handleNavigate("/Agendamentos/Horario", { state: { servicoDataEscolhido: { servicoEscolhido, dataEscolhida, horarioOcupado } } })} />
            </div>
        </div>
    );
}