import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigation } from "../../Hooks/useNavigation";
import { Botao } from "../../Components/Botao.jsx";
import { Titulo, Label } from "../../Components/Fontes.jsx";
import { FaHouse } from "react-icons/fa6";
import { Header } from "../../Components/Header.jsx";
import "../Styles/DefinirSessoes.css";
import { useEffect } from "react";

export function DefinirSessoes() {
  const { handleNavigate } = useNavigation();
  const location = useLocation();

  const { servicosSelecionados = [] } = location.state || {};
  const [quantidades, setQuantidades] = useState({});

  const handleQuantidadeChange = (servicoId, valor) => {
    setQuantidades((prev) => ({
      ...prev,
      [servicoId]: valor
    }));
  };

  const handleContinuar = () => {
    console.log("Serviços selecionados:", servicosSelecionados);
    console.log("Quantidades:", quantidades);

    handleNavigate("/ResumoPacote", {
      state: { servicosSelecionados, quantidades }
    });

    useEffect(() => {
      const box = document.querySelector(".definir");
      if (box) box.scrollTop = 0;
      }, []);
  };

  return (
    <div className="content definirsessoes">
      <Header
        alinhamento="flex-start"
        padding="0 10px"
        icone={<FaHouse size={28} />}
        texto="Menu"
        color="#282828"
      />

      <div className="tela2">
        <Titulo texto="Cadastro de Pacotes" />

        <Label texto="Defina a quantidade de sessões"/>
        <div className="servicos-box definir">

          {servicosSelecionados.length === 0 && (
            <div className="aviso-vazio">
              Nenhum serviço selecionado na etapa anterior.
            </div>
          )}

          {servicosSelecionados.map((servico) => (
            <div key={servico.id} className="servico-bloco">
              {/* Nome do serviço vindo da tela anterior */}
              <div className="nome-servico-card">{servico.nomeServico}</div>

              <input
                className="quantidade-input"
                type="number"
                min="1"
                placeholder="Digite a quantidade"
                value={quantidades[servico.id] || ""}
                onChange={(e) =>
                  handleQuantidadeChange(servico.id, e.target.value)
                }
              />
            </div>
          ))}
        </div>

        <div className="botoes">
          <Botao
            texto="Voltar"
            cor="#C8C5C5"
            onClick={() => handleNavigate("/Pacote/Cadastro")}
          />
          <Botao
            texto="Continuar"
            cor="#f8c7ccbb"
            onClick={handleContinuar}
          />
        </div>
      </div>
    </div>
  );
}
