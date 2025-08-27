// import { useState } from "react";
// import api from "../../Provider/api";
// import { useEffect } from "react";
import { Header } from "../../Components/Header";
import { FaHouse } from "react-icons/fa6";
import { Titulo, Subtitulo } from "../../Components/Fontes";
import { Botao } from "../../Components/Botao";
// import { useNavigate } from "react-router-dom";
import VisuAtendPorDia from "../../Components/VisuAtendPorDia";
import "../Styles/VisuAtendPorDia.css";

export function VisualizacaoAgendAtendDia() {
return (
    <div>

    <Header alinhamento="flex-start" padding="0 10px" icone={<FaHouse size={28}/>} texto="Retornar ao Menu"/>
    <Titulo texto="Agendamentos"/>
    <br></br>
    <Subtitulo texto="Consultas a realizar" />

    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <VisuAtendPorDia />
    </div>
     <div className="botoes">
        <Botao texto="Voltar" cor="#C8C5C5" onClick={() => navigate("/Menu")} />
    </div>
    </div>


  );
}