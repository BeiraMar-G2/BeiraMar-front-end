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

  // Mantém os dados anteriores
  const { servicosSelecionados = {}, quantidades = {} } = location.state || {};

  const [nomePacote, setNomePacote] = useState("");
  const [preco, setPreco] = useState("");

  const finalizar = () => {
    console.log({
      nomePacote,
      preco,
      servicosSelecionados,
      quantidades,
    });
    // navigate("/sucesso", { state: { nomePacote, preco, servicosSelecionados, quantidades } });
  };

  return (
    <div className="resumo-container">
      <Header
        alinhamento="flex-start"
        padding="0 10px"
        icone={<FaHouse size={28} />}
        texto="Retornar ao Menu"
      />

      <div className="formulario">
        <Titulo texto="Cadastro de Pacotes" />
        <p class="subtitulo">Coloque o Nome e o Preço Desejado</p>

        <div className="resumo-box">
          <div className="campo-group">
            <label className="campo-label">Nome do Pacote</label>
            <input
              type="text"
              className="campo"
              placeholder="Digite o nome do procedimento"
              value={nomePacote}
              onChange={(e) => setNomePacote(e.target.value)}
            />
          </div>

          <div className="campo-group">
            <div className="campo-label-linha">
              <label className="campo-label">Preço</label>
              <span className="campo-descricao">
                De acordo com os serviços selecionados o total seria R$ 500
              </span>
            </div>

            <input
              type="number"
              min="0"
              className="campo"
              placeholder="Digite o preço desejado"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
          </div>
        </div>

        <div className="botoes">
          <Botao
            texto="Voltar"
            cor="cinza"
            onClick={() =>
              navigate("/DefinirSessoes", { state: { servicosSelecionados } })
            }
          />
          <Botao texto="Finalizar" cor="rosa" onClick={finalizar} />
        </div>
      </div>
    </div>
  );
}
