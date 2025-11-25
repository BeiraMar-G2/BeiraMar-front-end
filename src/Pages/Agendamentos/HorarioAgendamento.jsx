import { useEffect, useState } from 'react';
import { Header } from '../../Components/Header';
import { Titulo, Subtitulo } from '../../Components/Fontes';
import { useLocation } from 'react-router-dom';
import { Botao } from '../../Components/Botao';
import { useNavigate } from 'react-router-dom';
import { FaHouse } from "react-icons/fa6";
import { Sucesso } from '../../Components/Modal';
import api from '../../Provider/api';
import "../Styles/HorarioAgendamento.css";

export function HorarioAgendamento() {
    const navigate = useNavigate();
    const [horarioSelecionado, setHorarioSelecionado] = useState('');
    const location = useLocation();
    const { servicoDataEscolhido } = location.state || {};
    const [showAlert, setShowAlert] = useState(false);
    const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

    function gerarHorarios(horaInicio, horaFim, horariosOcupados = [], dataEscolhida = '', duracao) {
        const horarios = [];
        
        if (!horaInicio || !horaFim) {
            return horarios;
        }
        
        // Garante que duracao é um número válido
        if (!duracao || isNaN(duracao)) {
            return horarios;
        }
        
        duracao = Number(duracao); // Converte para número se for string
        
        const [hInicio, mInicio] = horaInicio.split(':').map(Number);
        const [hFim, mFim] = horaFim.split(':').map(Number);

        const horariosOcupadosHoje = horariosOcupados
            .filter(ocupado => ocupado.startsWith(dataEscolhida))
            .map(ocupado => ocupado.split('T')[1].substring(0, 5));

        let hora = hInicio;
        let minuto = mInicio;

        while (hora < hFim || (hora === hFim && minuto < mFim)) {
            const horarioFormatado = `${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}`;
            
            let minutoFimNovoAgendamento = minuto + duracao;
            let horaFimNovoAgendamento = hora;
            
            if (minutoFimNovoAgendamento >= 60) {
                horaFimNovoAgendamento += Math.floor(minutoFimNovoAgendamento / 60);
                minutoFimNovoAgendamento = minutoFimNovoAgendamento % 60;
            }
            
            const minutoFimDisponibilidade = hFim * 60 + mFim;
            const minutoFimNovoAgendamentoTotal = horaFimNovoAgendamento * 60 + minutoFimNovoAgendamento;
            
            if (minutoFimNovoAgendamentoTotal > minutoFimDisponibilidade) {
                minuto += 30;
                if (minuto >= 60) {
                    minuto -= 60;
                    hora += 1;
                }
                continue;
            }
            
            let temConflito = false;

            for (let ocupado of horariosOcupadosHoje) {
                const [hOcupado, mOcupado] = ocupado.split(':').map(Number);
                
                let minutoFimOcupado = mOcupado + duracao;
                let horaFimOcupado = hOcupado;
                
                if (minutoFimOcupado >= 60) {
                    horaFimOcupado += Math.floor(minutoFimOcupado / 60);
                    minutoFimOcupado = minutoFimOcupado % 60;
                }
                
                const minutoInicio = hora * 60 + minuto;
                const minutoFimNovoAgend = horaFimNovoAgendamento * 60 + minutoFimNovoAgendamento;
                const minutoOcupadoInicio = hOcupado * 60 + mOcupado;
                const minutoOcupadoFim = horaFimOcupado * 60 + minutoFimOcupado;
                
                if (!(minutoFimNovoAgend <= minutoOcupadoInicio || minutoInicio >= minutoOcupadoFim)) {
                    temConflito = true;
                    break;
                }
            }
            
            if (!temConflito) {
                horarios.push(horarioFormatado);
            }

            minuto += 30;
            if (minuto >= 60) {
                minuto -= 60;
                hora += 1;
            }
        }
        
        return horarios;
    }

    function formatarDataCompleta({ dia, mes, ano }) {
      const meses = {
        1: 'Janeiro',
        2: 'Fevereiro',
        3: 'Março',
        4: 'Abril',
        5: 'Maio',
        6: 'Junho',
        7: 'Julho',
        8: 'Agosto',
        9: 'Setembro',
        10: 'Outubro',
        11: 'Novembro',
        12: 'Dezembro'
      };

      const diasSemana = [
        'Domingo', 'Segunda-feira', 'Terça-feira', 
        'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'
      ];

      const data = new Date(Number(ano), Number(mes) - 1, Number(dia));
      const nomeDiaSemana = diasSemana[data.getDay()];

      return `${dia} de ${meses[Number(mes)]} de ${ano} - ${nomeDiaSemana}`;
    }


    const ClickHorario = (horario) => {
        setHorarioSelecionado(horario);
    };

    const botaoVoltar = () => {
        navigate(-1);
    };

    const botaoContinuar = () => {
        const duracao = servicoDataEscolhido.servicoEscolhido.servicoDuracao;
        const [hora, minuto] = horarioSelecionado.split(':').map(Number);
        
        const dataHoraInicio = new Date(
            servicoDataEscolhido.dataEscolhida.ano,
            servicoDataEscolhido.dataEscolhida.mes - 1,
            servicoDataEscolhido.dataEscolhida.dia,
            hora,
            minuto
        );
        
        const dataHoraFim = new Date(dataHoraInicio.getTime() + duracao * 60000);
        
        const agendamento = {
            fkServico: Number(servicoDataEscolhido.servicoEscolhido.servicoId),
            fkCliente: Number(sessionStorage.getItem("idUsuario")),
            fkFuncionario: 1,
            dtHora: `${servicoDataEscolhido.dataEscolhida.formato}T${horarioSelecionado}:00`,
            dtHoraFim: `${dataHoraFim.getFullYear()}-${String(dataHoraFim.getMonth() + 1).padStart(2, '0')}-${String(dataHoraFim.getDate()).padStart(2, '0')}T${String(dataHoraFim.getHours()).padStart(2, '0')}:${String(dataHoraFim.getMinutes()).padStart(2, '0')}:00`,
            valorPago: servicoDataEscolhido.servicoEscolhido.servicoPreco,
            statusAgendamento: "Agendado",
            status: "Agendado",
            dataValidade: null,
            fkPacote: servicoDataEscolhido.servicoEscolhido.pacoteId
        };
        
        api.post("/agendamentos", agendamento)
        .then((response) => {
            if(response.status === 201) {
                setShowAlert(true);
                setTimeout(() => setShowAlert(false), 5000);
    
                setTimeout(() => 
                    navigate("/Agendamentos/VisualizarConsultas"), 4000);
            }
        })
        .catch((error) => {
            console.error("Erro ao criar agendamento:", error);
        });
    };

    function obterDiaSemana(data) {
        const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const [ano, mes, dia] = data.split('-').map(Number);
        const dataObj = new Date(ano, mes - 1, dia);
        return diasSemana[dataObj.getDay()];
    }

    function buscarDisponibilidade() {
        api.get("/disponibilidades")
        .then((response) => {
            const dataEscolhida = servicoDataEscolhido.dataEscolhida.formato;
            const diaSemanaEscolhido = obterDiaSemana(dataEscolhida);
            
            const disponibilidadeDia = response.data.find(disp => disp.diaSemana === diaSemanaEscolhido);

            if (disponibilidadeDia) {
                const horariosOcupados = Array.isArray(servicoDataEscolhido.horarioOcupado) 
                    ? servicoDataEscolhido.horarioOcupado 
                    : [];
                
                // Garante que duracao é um número válido
                const duracao = Number(servicoDataEscolhido.servicoEscolhido.servicoDuracao) || 60;
                
                const horarios = gerarHorarios(
                    disponibilidadeDia.horaInicio,
                    disponibilidadeDia.horaFim,
                    horariosOcupados,
                    dataEscolhida,
                    duracao
                );

                setHorariosDisponiveis(horarios);
                
                // Define o primeiro horário disponível como selecionado
                if (horarios.length > 0) {
                    setHorarioSelecionado(horarios[0]);
                }
            } else {
                setHorariosDisponiveis([]);
            }
        })
        .catch((error) => {
            console.error("Erro ao buscar disponibilidades:", error);
        });
    }

    useEffect(() => {
        if (servicoDataEscolhido) {
            buscarDisponibilidade();
        }
    }, []);
    
    

    return (        
        <div className="horario-agendamento">
        
            <Header  
                texto="Menu" 
                cor = "#CE2D4F"
                alinhamento="flex-start" 
                padding="0 10px" 
                icone={<FaHouse size={28}/>} 
                color="#f8f8f8"
                isCliente={true}
            />
            
            <div className="container-agendamento">
                <div className="servico-info">
                    <Subtitulo texto="Serviço Escolhido:" /> <br />
                    <Titulo texto={servicoDataEscolhido.servicoEscolhido.servicoNome}/>
                </div>

                <div className="novo-agendamento">
                    <h3>Novo Agendamento</h3>
                </div>

            <Sucesso
             show={showAlert} 
             onClose={() => setShowAlert(false)}
             texto="Sua Consulta foi Agendada com Sucesso!  Redirecionando..."
             />

                <div className="horarios-grid">
                    <div className="data-info">
                        <p>
                        {formatarDataCompleta(servicoDataEscolhido.dataEscolhida)}
                        </p>
                    </div>
                    {horariosDisponiveis.map((horario) => (
                        <button
                            key={horario}
                            className={`horario-btn ${horarioSelecionado === horario ? 'selecionado' : ''}`}
                            onClick={() => ClickHorario(horario)}
                        >
                            {horario}
                        </button>
                    ))}
                </div>
                <div className="horario-selecionado">
                    <span>Horário selecionado: {horarioSelecionado}</span>
                </div>

                <div className="botoes-acao">
                    <Botao 
                        texto="Voltar"
                        cor="#cccccc"
                        onClick={botaoVoltar}
                    />
                    <Botao 
                        texto="Continuar" 
                        cor="#f8c7ccbb" 
                        onClick={botaoContinuar} 
                    />
                </div>
            </div>
        </div>
    );
}
