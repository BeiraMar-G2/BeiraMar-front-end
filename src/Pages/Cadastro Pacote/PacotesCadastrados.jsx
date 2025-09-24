import { useState } from "react";
import { useEffect } from "react";
import { Header } from "../../Components/Header";
import { PacoteCard } from "../../Components/PacoteCard";
import { useNavigate } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import "../../Pages/Styles/PacotesCadastrados.css";
import { Titulo } from "../../Components/Fontes";
import { InputPesquisa } from "../../Components/Input";
import { Botao } from "../../Components/Botao"; 
import { Sucesso, Erro } from "../../Components/Modal";
import api from "../../Provider/api";


export function PacotesCadastrados() {
  const [showAlert, setShowAlert] = useState(false);
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

  function handleAcao(acao, id) {
    if (acao === "editar") {
        if(tipo === "Serviços") {
          navigate("/Servico/Edicao", {state: { servicoEditado: {id: id} }})
        }
    } else if (acao === "excluir") {
      if(tipo === "Pacotes"){
          console.log("Excluir Pacote ID:", id);
          api.delete(`/pacotes/${id}`)
          window.reload();
      } else {
          api.delete(`/servicos/${id}`)
          .then((response) => {
            if (response.status === 204) {
              setShowAlert(true);
              setTimeout(() => setShowAlert(false), 5000);
              setTimeout(() => {
                window.location.reload();
              }, 4000);
              console.log("Serviço excluído com sucesso:", response);
            }
          })
          .catch((error) => {
            console.error("Erro ao excluir serviço:", error);
          });
      }
    }
  }

  function buscarServicosPacotes() {
    api.get("/pacotes")
    .then((response) => {
        console.log("Pacotes:", response.data);
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
        console.log("Serviços:", response.data);
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
        cor="#90FCF9"
        texto="Menu"
        color="#282828"
      />

      <Sucesso
        show={showAlert} 
        onClose={() => setShowAlert(false)}
        texto="Serviço excluído com sucesso!  Recarregando página..."
        />

      <Titulo
        texto={
          tipo === "Pacotes" ? "Pacotes Cadastrados" : "Serviços Cadastrados"
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

        {/* Pesquisa */}
        <InputPesquisa
          className="input-pesquisa"
          placeholder={`Pesquisar ${tipo.toLowerCase()}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Lista */}
        <div className="lista flex flex-col gap-3 w-72 overflow-y-auto max-h-96">
          {filtrados.map((item) =>
            tipo === "Pacotes" ? (
              <PacoteCard key={item.idPacote} id={item.idPacote} nome={item.nome} preco={item.precoTotalSemDesconto} tipo={"Func"} onClick={handleAcao}/>
            ) : (
              <PacoteCard
                key={item.idServico}
                id={item.idServico}
                nome={item.nome}
                preco={item.preco}
                duracao={item.duracao}
                tipo="Func"
                onClick={handleAcao}
              />
            )
          )}
        </div>

        <div style={{ display:"flex", justifyContent:"center", width: "90%", marginTop: "18px" }}>
          <Botao cor="#d9d9d9" texto="Voltar" onClick={() => {navigate("/Servicos&Pacotes")}}/>
        </div>
      </div>
    </div>
  );
}
