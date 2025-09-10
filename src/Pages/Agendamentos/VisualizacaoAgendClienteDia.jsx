// import { useEffect } from "react";
import { Header } from "../../Components/Header";
import { FaHouse } from "react-icons/fa6";
import { Titulo, Subtitulo } from "../../Components/Fontes";
import { Botao } from "../../Components/Botao";
import { useNavigate } from "react-router-dom";
import VisuClientePorDia from "../../Components/VisuClientePorDia";
import "../Styles/VisuClientePorDia.css";

export function VisualizacaoAgendClienteDia() {
  const navigate = useNavigate();

return (
    <div>
      <br />
    <Header alinhamento="flex-start" padding="0 10px" icone={<FaHouse size={28}/>} texto="Menu" isCliente="true" cor="#CE2D4F" color="#f8f8f8"/>
    <Titulo texto="Agendamentos"/>
    <br></br>
    <Subtitulo texto="Consultas a realizar" />

    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <VisuClientePorDia />
    </div>
     <div className="botoes-acao">
        <Botao texto="Voltar" cor="#C8C5C5" onClick={() => navigate(-1)} />
    </div>
    </div>


  );
}