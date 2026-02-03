import React, { useState } from "react";
import { Header } from "../../Components/Header";
import { Botao } from "../../Components/Botao";
import { useLocation } from "react-router-dom";
import { useNavigation } from "../../Hooks/useNavigation";
import { FaHouse } from "react-icons/fa6";
import "../Styles/Form.css";
import "../Styles/Input.css";
import "../Styles/IndisponibilidadeHora.css";
import api from "../../Provider/api";

export function IndisponibilidadeHora() {
    const { handleNavigate } = useNavigation();
    const location = useLocation();
    const [inicioAusencia, setInicioAusencia] = useState("");
    const [retornoAusencia, setRetornoAusencia] = useState("");

    const dataSelecionada = location.state?.dataSelecionada || "21/05/25 - Quarta-Feira";

    const handleContinuar = () => {
        console.log("Início da Ausência:", inicioAusencia);
        console.log("Retorno da Ausência:", retornoAusencia);
        api.post("/indisponibilidade", {
            data: dataSelecionada,
            inicio: inicioAusencia,
            retorno: retornoAusencia
        })
        .then((response) => {
            console.log("Indisponibilidade registrada com sucesso:", response.data);
        })
        .catch((error) => {
            console.error("Erro ao registrar indisponibilidade:", error);
        });
    };

    return (
        <div className="content">
            <Header 
                alinhamento="flex-start" 
                padding="0 10px" 
                icone={<FaHouse size={28}/>} 
                texto="Menu" 
                color="#282828"
            />
            
            <div className="indisponibilidade-container">
                <h2 className="titulo-informacoes">Informações adicionais</h2>
                
                <div className="card-container">
                    <div className="dia-selecionado">
                        <span className="label-dia">Dia selecionado: {dataSelecionada}</span>
                    </div>

                    <div className="form-ausencia">
                        <div className="campo-ausencia">
                            <h3 className="titulo-campo">Início da Ausência:</h3>
                            <p className="descricao-campo">Digite o horário inicial da ausência</p>
                            <div className="conjuntoInput">
                                <input
                                    type="time"
                                    value={inicioAusencia}
                                    onChange={(e) => setInicioAusencia(e.target.value)}
                                    placeholder="Digite o horário inicial da ausência"
                                />
                            </div>
                        </div>

                        <div className="campo-ausencia">
                            <h3 className="titulo-campo">Retorno da Ausência:</h3>
                            <p className="descricao-campo">Digite o horário de retorno</p>
                            <div className="conjuntoInput">
                                <input
                                    type="time"
                                    value={retornoAusencia}
                                    onChange={(e) => setRetornoAusencia(e.target.value)}
                                    placeholder="Digite o horário de retorno"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="botoes-container">
                    <Botao
                        texto="Voltar"
                        cor="#D3D3D3"
                        onClick={() => handleNavigate(-1)}
                    />
                    <Botao
                        texto="Continuar"
                        cor="#F4A6CD"
                        onClick={handleContinuar}
                    />
                </div>
            </div>
        </div>
    );
}
