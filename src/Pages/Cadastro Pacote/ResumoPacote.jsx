import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Botao } from "../../Components/Botao.jsx";
import { Header } from "../../Components/Header.jsx";
import { Titulo, Label } from "../../Components/Fontes.jsx";
import { FaHouse } from "react-icons/fa6";
import { Sucesso, Erro } from "../../Components/Modal.jsx";
import "../Styles/ResumoPacote.css";
import api from "../../Provider/api.js";

export function ResumoPacote() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);  
  const [precoSugerido, setPrecoSugerido] = useState(0);
  const [sessoesTotal, setSessoesTotal] = useState(0);
  const [limitePacote, setLimitePacote] = useState(0);
  const [idPacote, setIdPacote ] = useState(0);

  // Mantém os dados anteriores
  const { servicosSelecionados = {}, quantidades = {} } = location.state || {};

  const [nomePacote, setNomePacote] = useState("");
  const [preco, setPreco] = useState("");

  const finalizar = () => {
    api.post("/pacotes", {
      idPacote: "default",
      nome: nomePacote,
      precoTotalSemDesconto: preco == null ? precoSugerido : preco,
      qtdSessoesTotal: sessoesTotal,
      tempoLimiteDia: limitePacote
    })
    .then((response) => {
      console.log(response)
      setIdPacote(response.data.idPacote)
      const novoPacoteId = response.data.idPacote; 
      setIdPacote(novoPacoteId);
      return (
        servicosSelecionados.map(servico =>
          api.post("/sessoes", {
            fkPacote: novoPacoteId,
            fkServico: servico.id,
            qtdSessoes: quantidades[servico.id]
          })
          .then((res) => {
            console.log("Sessão criada:", res.data);
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 6000);
            setTimeout(() => {  
              navigate("/Servicos&Pacotes");
            }, 4000);
          })
        )
      );
    })
    .then((responses) => {
      console.log("Sessões criadas:", responses);
    })
    .catch((error) => {
      console.error("Erro ao finalizar cadastro de Sessões:", error);
    });
  };

  useEffect(() => {
    if (Array.isArray(servicosSelecionados)) {
      const soma = servicosSelecionados.reduce(
        (acc, servico) => acc + servico.preco * (quantidades[servico.id] || 1),
        0
      );
      const somaSessoes = servicosSelecionados.reduce(
        (ac, servico) => parseInt(ac + Number(quantidades[servico.id]), 10),
        0
      )
      setSessoesTotal(somaSessoes)
      setPrecoSugerido(soma);
    }
  }, [servicosSelecionados]);

  return (
    <div className="resumo-container">
      <Header
        alinhamento="flex-start"
        padding="0 10px"
        icone={<FaHouse size={28} />}
        texto="Menu"
        color="#282828"
      />

      <Sucesso
        show={showAlert} 
        onClose={() => setShowAlert(false)}
        texto="Pacote criado com sucesso. Vamos vender!  Redirecionando..."
        />

      <div className="formulario">
        <Titulo texto="Cadastro de Pacotes" />
        <p className="subtitulo">Coloque o Nome e o Preço Desejado</p>

        <div className="resumo-box">
          <div className="campo-group">
            <Label texto="Nome do Pacote"/>
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
              <Label texto="Preço"/>
              <span className="campo-descricao">
                Baseado na quantidade de sessões e nos serviços o total seria: R$ {precoSugerido}
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

          <div className="campo-group">
            <Label texto="Tempo Limite do Pacote"/>
            <input
              type="text"
              className="campo"
              placeholder="Digite o tempo limite de existência do Pacote"
              value={limitePacote}
              onChange={(e) => setLimitePacote(e.target.value)}
            />
          </div>
        </div>

        <div className="botoes">
          <Botao
            texto="Voltar"
            cor="#C8C5C5"
            onClick={() =>
              navigate("/DefinirSessoes", { state: { servicosSelecionados } })
            }
          />
          <Botao 
            texto="Finalizar" 
            cor="#f8c7ccbb" 
            onClick={finalizar} 
          />
        </div>
      </div>
    </div>
  );
}
