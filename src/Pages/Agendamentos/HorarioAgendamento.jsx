import { useState } from 'react';
import { Header } from '../../Components/Header';
import { Botao } from '../../Components/Botao';
import { useNavigate } from 'react-router-dom';
import { FaHouse } from "react-icons/fa6";
import "../Styles/HorarioAgendamento.css";

export function HorarioAgendamento() {
    const navigate = useNavigate();
    const [horarioSelecionado, setHorarioSelecionado] = useState('16:20');

    const horarios = [
        '10:30', '11:30', '12:40',
        '16:20', '19:40', '21:00'
    ];

    const ClickHorario = (horario) => {
        setHorarioSelecionado(horario);
    };

    const botaoVoltar = () => {
        navigate(-1);
    };

    const botaoContinuar = () => {
        console.log('Horário selecionado:', horarioSelecionado);
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
                    <span className="servico-label">Serviço escolhido:</span> <br />
                    <h2 className="servico-titulo">Design de sobrancelha</h2>
                </div>

                <div className="novo-agendamento">
                    <h3>Novo Agendamento</h3>
                </div>

                <div className="horarios-grid">
                    <div className="data-info">
                        <p>21 de Maio de 2025 - Quarta Feira</p>
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
