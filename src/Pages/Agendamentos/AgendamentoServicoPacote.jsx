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
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function AgendamentoServicoPacote() {
    const navigate = useNavigate();
    const [mesAtual, setMesAtual] = useState(null);
    const [diasAgendados, setDiasAgendados] = useState([]);
    const [diaSelecionado, setDiaSelecionado] = useState(null);
    const [dataEscolhida, setDataEscolhida] = useState({
    });
    const location = useLocation();
    const { servicoEscolhido } = location.state || {};

    function handleDiaSelecionado(date) {
        const dia = date.getDate().toString().padStart(2, '0');
        const mes = (date.getMonth() + 1).toString().padStart(2, '0');
        const ano = date.getYear()+1900;
        setDataEscolhida({dia: dia, mes: mes, ano: ano, formato: `${ano}-${mes}-${dia}`});
        setDiaSelecionado(`${dia}/${mes}`);
    }

    function buscarAgendamentos() {
        api.get("/agendamentos")
        .then((response) => {
            const agendamentos = response.data.map(dataAgendamento =>
            dataAgendamento.dtHora.split("T")[0]
        );
        setDiasAgendados(agendamentos);
        console.log("Array novo:", agendamentos);
        }
        )
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
                icone={<FaHouse size={28}/>} 
                cor="#CE2D4F"
                texto="Menu"
                color="#f8f8f8"
            />

            <Subtitulo texto="Serviço Escolhido:" />
            <Titulo texto={servicoEscolhido.servicoNome}/>

            <div className="calendario-wrapper">


                <Calendar 
                onActiveStartDateChange={({ activeStartDate, view }) => {
                      if (view === "month") {
                        const mes = activeStartDate.getMonth();
                        setMesAtual(mes);
                        console.log("Mês exibido:", mes + 1) // Exibe o mês atual (0 = Janeiro, 1 = Fevereiro, etc.)
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
                className={"calendario"}/>

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

            <div className="botoes">
                <Botao texto="Voltar" cor="#C8C5C5" onClick={() => navigate("/PacotesCadastradosCliente")} />
                <Botao texto="Continuar" cor="#f8c7ccbb" onClick={() => navigate("/Agendamentos/Horario", { state: {servicoDataEscolhido: {servicoEscolhido, dataEscolhida}}  })} />
            </div>
        </div>
    );
}