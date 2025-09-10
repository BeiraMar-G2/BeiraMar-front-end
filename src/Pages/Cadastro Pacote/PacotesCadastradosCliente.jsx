import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../Components/Header";
import { PacoteCard } from "../../Components/PacoteCard";
import { FaHouse } from "react-icons/fa6";
import "../../Pages/Styles/PacotesCadastrados.css";
import { Titulo } from "../../Components/Fontes";
import { InputPesquisa } from "../../Components/Input";
import { Botao } from "../../Components/Botao";
import api from "../../Provider/api";

export function PacotesCadastradosCliente() {
  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("Pacotes");
  const navigate = useNavigate();

  const [pacotes, setPacotes] = useState([
    {
      id: 1,
      nome: "3 Massagens Modeladoras + 2 Drenagens Linfáticas",
      precoTotalSemDesconto: 470,
      qtdSessoesTotal: 5,
      tempoLimiteDias: 30
    }
  ]);

  const [servicos, setServicos] = useState([
    {
      id: 1,
      nome: "Massagem Relaxante",
      duracao: "60 min",
      preco: 120,
    },
  ]);

  const dados = tipo === "Pacotes" ? pacotes : servicos;

  const filtrados = dados.filter((item) =>
    item.nome.toLowerCase().includes(search.toLowerCase())
  );

  function buscarServicosPacotes() {
    api.get("/pacotes")
    .then((response) => {
        setPacotes(response.data.map(pacote => ({
            idPacote: pacote.idPacote,
            nome: pacote.nome,
            precoTotalSemDesconto: pacote.precoTotalSemDesconto,
            qtdSessoesTotal: pacote.qtdSessoesTotal,
            tempoLimiteDias: pacote.tempoLimiteDias
        })));
    })
    .catch((error) => {
        console.error("Erro ao buscar pacotes", error);
    });
    api.get("/servicos")
    .then((response) => {
        setServicos(response.data.map(servico => ({
            idServico: servico.idServico,
            nome: servico.nome,
            duracao: servico.duracao,
            preco: servico.preco
        })));
    })
    .catch((error) => {
        console.error("Erro ao buscar serviços:", error);
    });
  }

  useEffect(() => {
        buscarServicosPacotes();
    }, []);

  return (
    <div className="content-page">
      <Header
        alinhamento="flex-start"
        padding="0 10px"
        icone={<FaHouse size={28} />}
        cor="#CE2D4F"
        texto="Menu"
        color="#f8f8f8"
        isCliente={true}
      />

      <Titulo
        texto={
          tipo === "Pacotes" ? "Pacotes Para Você!" : "Serviços Para Você!"
        }
      />

      <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
        <select
          className="w-64 border rounded-lg p-2 mb-2"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          <option>Pacotes</option>
          <option>Serviços</option>
        </select>

        <InputPesquisa
          className="input-pesquisa"
          placeholder={`Pesquisar ${tipo.toLowerCase()}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="lista flex flex-col gap-3 w-72 overflow-y-auto max-h-96">
          {filtrados.map((item) =>
            tipo === "Pacotes" ? (
              <PacoteCard key={item.idPacote} nome={item.nome} preco={item.precoTotalSemDesconto} onClick={() => navigate("/Agendamentos/${tipo}", { state: { servicoEscolhido: { pacoteId: item.idPacote, pacoteNome: item.nome, pacoteQtdSessoes: item.qtdSessoesTotal, tipo: tipo } } } )}/>
            ) : (
              <PacoteCard
                key={item.idServico}
                nome={item.nome}
                preco={item.preco}
                duracao={item.duracao}
                onClick={() => navigate("/Agendamentos/${tipo}", { state: { servicoEscolhido: { servicoId: item.idServico, servicoNome: item.nome, servicoPreco: item.preco, tipo: tipo } } })}
              />
            )
          )}
        </div>

        <div style={{ display:"flex", justifyContent:"center", width: "90%", marginTop: "18px" }}>
          <Botao cor="#d9d9d9" texto="Voltar" onClick={() => {navigate(-1)}}/>
        </div>
      </div>
    </div>
  );
}
