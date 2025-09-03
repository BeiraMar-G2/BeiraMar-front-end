import { useState } from 'react';
import { Header } from '../../Components/Header';
import { Titulo, Subtitulo } from '../../Components/Fontes';
import { useLocation } from 'react-router-dom';
import { Botao } from '../../Components/Botao';
import { useNavigate } from 'react-router-dom';
import { FaHouse } from "react-icons/fa6";
import api from '../../Provider/api';
import "../Styles/HorarioAgendamento.css";

export function HorarioAgendamento() {
    const navigate = useNavigate();
    const [horarioSelecionado, setHorarioSelecionado] = useState('16:20');
    const location = useLocation();
    const { servicoDataEscolhido } = location.state || {};

    const horarios = [
        '10:30', '11:30', '12:40',
        '16:20', '19:40', '21:00'
    ];

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
        console.log("Agendamento a ser enviado:", {
            idServico: servicoDataEscolhido.servicoEscolhido.id,
            fkCliente: localStorage.getItem("idUsuario"),
            fkFuncionario: 1,
            dtHora: `${servicoDataEscolhido.dataEscolhida.formato}T${horarioSelecionado}:00`,
            valorPago: servicoDataEscolhido.servicoEscolhido.preco,
            statusAgendamento: "Agendado",
            status: "Agendado",
            dataValidade: null,
            fkPacote: null
        })
        //navigate("/Agendamentos/Confirmacao", { state: { servicoDataHorarioEscolhido: { ...servicoDataEscolhido, horarioSelecionado } } });
        api.post("/agendamentos", {
            idServico: servicoDataEscolhido.servicoEscolhido.id,
            fkCliente: localStorage.getItem("idUsuario"),
            fkFuncionario: 1,
            dtHora: `${servicoDataEscolhido.dataEscolhida.formato}T${horarioSelecionado}:00`,
            valorPago: servicoDataEscolhido.servicoEscolhido.preco,
            statusAgendamento: "Agendado",
            status: "Agendado",
            dataValidade: null,
            fkPacote: null
        })
        .then((response) => {
            console.log("Agendamento criado:", response.data);
            navigate("/Agendamentos/Confirmacao", { state: { servicoDataHorarioEscolhido: { ...servicoDataEscolhido, horarioSelecionado } } });
        })
    };

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

                <div className="horarios-grid">
                    <div className="data-info">
                        <p>
                        {formatarDataCompleta(servicoDataEscolhido.dataEscolhida)}
                        </p>
                    </div>
                    {horarios.map((horario) => (
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
