import { useEffect, useState } from "react";
import { Header } from "../../Components/Header";
import { FaHouse } from "react-icons/fa6";
import { Titulo, Subtitulo } from "../../Components/Fontes";
import { Botao } from "../../Components/Botao";
import { useNavigation } from "../../Hooks/useNavigation";
import VisuAtendPorDia from "../../Components/HistoricoAgendamento.jsx";
import "../Styles/HistoricoAgendamento.css";
import api from "../../Provider/api";

export function HistoricoAgendAtend() {
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState(""); 
  const { handleNavigate } = useNavigation();

  function buscarClientes() {
    api
      .get("/clientes")
      .then((response) => {
        console.log(response);
        const clientesFormatados = response.data.map((cliente) => ({
          idCliente: cliente.idUsuario,
          nome: cliente.nome,
        }));
        setClientes(clientesFormatados);
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes", error);
      });
  }

  useEffect(() => {
    buscarClientes();
  }, []);

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
          value={clienteSelecionado}
          onChange={(e) => setClienteSelecionado(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "20px",
          }}
        >
          <option disabled value="">Selecione um cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.idCliente} value={cliente.idCliente}>
              {cliente.nome}
            </option>
          ))}
        </select>

          {clienteSelecionado && <VisuAtendPorDia cliente={clienteSelecionado} />}
      </div>

      <div className="botoes-acao">
        <Botao texto="Voltar" cor="#C8C5C5" onClick={() => handleNavigate("/Menu")} />
      </div>
    </div>
  );
}
