import { useState } from "react";
import { Header } from "../../Components/Header";
import { FaHouse } from "react-icons/fa6";
import { Titulo, Subtitulo } from "../../Components/Fontes";
import { Botao } from "../../Components/Botao";
// import { useNavigate } from "react-router-dom";
import VisuAtendPorDia from "../../Components/HistoricoAgendamento.jsx";
import "../Styles/HistoricoAgendamento.css";

export function HistoricoAgendAtend() {
  const [cliente, setCliente] = useState("Roberta");

  return (
    <div>
      <br />
      <Header
        alinhamento="flex-start"
        padding="0 10px"
        icone={<FaHouse size={28} />}
        texto="Retornar ao Menu"
        color="#282828"
      />
      <Titulo texto="Agendamentos" />
      <br />
      <Subtitulo texto="Consultas a realizar" />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        {/* Select de clientes */}
        <select
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "20px",
          }}
        >
          <option>Roberta</option>
          <option>Ana</option>
          <option>Juliana</option>
          <option>Patrícia</option>
          <option>Fernanda</option>
        </select>

        {/* Componente que você já fez */}
        <VisuAtendPorDia cliente={cliente} />
      </div>

      <div className="botoes-acao">
        <Botao texto="Voltar" cor="#C8C5C5" onClick={() => navigate("/Menu")} />
      </div>
    </div>
  );
}
