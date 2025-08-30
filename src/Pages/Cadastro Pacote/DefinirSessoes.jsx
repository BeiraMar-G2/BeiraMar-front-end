import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Botao } from "../../Components/Botao.jsx";
import { Titulo, Label } from "../../Components/Fontes.jsx";
import { FaHouse } from "react-icons/fa6"; // mesmo ícone usado no CadastroPacote
import { Header } from "../../Components/Header.jsx"; // import do Header
import "../Styles/DefinirSessoes.css"; // <<< css exclusivo desta tela

export function DefinirSessoes() {
  const navigate = useNavigate();
  const location = useLocation();

  // vindo da tela anterior
  const { servicosSelecionados } = location.state || { servicosSelecionados: {} };

  // id -> nome completo
  const servicosNomes = {
    sobrancelha: "Design de Sobrancelha",
    massagem: "Massagem Modeladora",
    drenagem: "Drenagem",
    limpeza: "Limpeza de Pele",
  };

  // somente ids marcados como true
  const servicosAtivos = Object.keys(servicosSelecionados || {}).filter(
    (k) => servicosSelecionados[k]
  );

  // quantidades por serviço
  const [quantidades, setQuantidades] = useState({});

  const handleQuantidadeChange = (servicoId, valor) => {
    setQuantidades((prev) => ({ ...prev, [servicoId]: valor }));
  };

  const handleContinuar = () => {
    console.log("Quantidades:", quantidades);
    // navegue para onde quiser levando os dados
    // navigate("/confirmar", { state: { servicosSelecionados, quantidades } });
  };

  return (
    <div className="content definirsessoes">
      {/* Header padronizado */}
      <Header
        alinhamento="flex-start"
        padding="0 10px"
        icone={<FaHouse size={28} />}
        texto="Retornar ao Menu"
      />

      <div className="tela2">
        <Titulo texto="Cadastro de Pacotes" />
        <h3 className="titulo-servicos">Serviços do Pacote</h3>

        <div className="servicos-box">
          <Label texto="Defina a quantidade de sessões" tamanho="18px" />

          {servicosAtivos.length === 0 && (
            <div className="aviso-vazio">
              Nenhum serviço selecionado na etapa anterior.
            </div>
          )}

          {servicosAtivos.map((servicoId) => (
            <div key={servicoId} className="servico-bloco">
              {/* Nome do serviço - apenas exibição */}
              <div className="nome-servico-card">{servicosNomes[servicoId]}</div>

              {/* Input numérico */}
              <input
                className="quantidade-input"
                type="number"
                min="1"
                placeholder="Digite a quantidade"
                value={quantidades[servicoId] || ""}
                onChange={(e) => handleQuantidadeChange(servicoId, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="botoes">
          <Botao
            texto="Voltar"
            cor="cinza"
            onClick={() => navigate("/Cadastro/Pacote")}
          />
          <Botao
            texto="Continuar"
            onClick={() => navigate("/ResumoPacote")}
          />
        </div>
      </div>
    </div>
  );
}
