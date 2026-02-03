import { Header } from "../../Components/Header";
import { FaHouse } from "react-icons/fa6";
import { Titulo, Subtitulo } from "../../Components/Fontes";
import { Botao } from "../../Components/Botao";
import { useNavigation } from "../../Hooks/useNavigation";
import VisuAtendPorDia from "../../Components/HistoricoAgendamento.jsx";
import "../Styles/HistoricoAgendamento.css";

export function HistoricoAgendCliente() {
  const { handleNavigate } = useNavigation();
return (
    <div>
      <br />
    <Header alinhamento="flex-start" padding="0 10px" icone={<FaHouse size={28}/>} texto="Retornar ao Menu" cor="#CE2D4F" color="#f8f8f8"/>
    <Titulo texto="Agendamentos"/>
    <br></br>
    <Subtitulo texto="Consultas já realizadas!" />

    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <VisuAtendPorDia />
    </div>
     <div className="botoes-acao">
        <Botao texto="Voltar" cor="#C8C5C5" onClick={() => handleNavigate(-1)} />
    </div>
    </div>


  );
}