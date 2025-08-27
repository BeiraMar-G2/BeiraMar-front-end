import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Botao } from "../../Components/Botao.jsx";
import { Header } from "../../Components/Header.jsx";
import { Titulo, Subtitulo } from "../../Components/Fontes.jsx";
import { FaHouse } from "react-icons/fa6";
import "../Styles/ResumoPacote.css";

export function ResumoPacote() {
  const navigate = useNavigate();
  const location = useLocation();

  // Mantém os dados anteriores (não exibimos aqui, mas levamos adiante)
  const { servicosSelecionados = {}, quantidades = {} } = location.state || {};

  const [nomePacote, setNomePacote] = useState("");
  const [preco, setPreco] = useState("");

  const finalizar = () => {
    // envie para API / próxima tela
    console.log({
      nomePacote,
      preco,
      servicosSelecionados,
      quantidades,
    });
    // navigate("/sucesso", { state: { nomePacote, preco, servicosSelecionados, quantidades } });
  };

  return (
    <div className="content resumo-pacote">
      <Header
        alinhamento="flex-start"
        padding="0 10px"
        icone={<FaHouse size={28} />}
        texto="Retornar ao Menu"
      />

      <div className="formulario">
        <Titulo texto="Cadastro de Pacotes" />
        <Subtitulo texto="Selecione o preço do pacote" />

        <div className="resumo-box">
          <div className="campo-group">
            <label className="campo-label">Nome do pacote</label>
            <input
              type="text"
              className="campo"
              placeholder="Digite o nome do pacote"
              value={nomePacote}
              onChange={(e) => setNomePacote(e.target.value)}
            />
          </div>

          <div className="campo-group">
            <label className="campo-label">Preço do pacote</label>
            <input
              type="number"
              min="0"
              className="campo"
              placeholder="Digite o preço do pacote"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
          </div>
        </div>

        <div className="botoes">
          <Botao
            texto="Voltar"
            onClick={() =>
              navigate("/DefinirSessoes", { state: { servicosSelecionados } })
            }
            style={{ backgroundColor: "#d3d3d3", color: "#000" }}
          />
          <Botao texto="Finalizar" onClick={finalizar} />
        </div>
      </div>
    </div>
  );
}
