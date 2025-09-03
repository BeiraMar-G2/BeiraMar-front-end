import { useState } from "react";
import { Input } from "../../Components/Input";
import { Header } from "../../Components/Header";
import { PacoteCard } from "../../Components/PacoteCard";
import { useNavigate } from "react-router-dom";
import { FaHouse } from "react-icons/fa6";
import "../../Pages/Styles/PacotesCadastrados.css";
import { Titulo } from "../../Components/Fontes";
import { InputPesquisa } from "../../Components/Input";
import { Botao } from "../../Components/Botao"; 

export function PacotesCadastrados() {
  const [search, setSearch] = useState("");
  const [tipo, setTipo] = useState("Pacotes");
  const navigate = useNavigate();

  const pacotes = [
    {
      id: 1,
      nome: "3 Massagens Modeladoras + 2 Drenagens Linfáticas",
      preco: 470,
    },
    {
      id: 2,
      nome: "3 Hidrolipo NA + 3 Detox Corporal",
      preco: 630,
    },
    {
      id: 3,
      nome: "3 Aplicações de Enzimas + 2 Drenagens Linfáticas",
      preco: 840,
    },
  ];

  const servicos = [
    {
      id: 1,
      nome: "Massagem Relaxante",
      duracao: "60 min",
      preco: 120,
    },
    {
      id: 2,
      nome: "Drenagem Linfática",
      duracao: "50 min",
      preco: 100,
    },
    {
      id: 3,
      nome: "Limpeza de Pele",
      duracao: "45 min",
      preco: 90,
    },
  ];

  const dados = tipo === "Pacotes" ? pacotes : servicos;

  const filtrados = dados.filter((item) =>
    item.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="content-page">
      <Header
        alinhamento="flex-start"
        padding="0 10px"
        icone={<FaHouse size={28} />}
        cor="#90FCF9"
        texto="Retornar ao Menu"
        color="#282828"
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
              <PacoteCard key={item.id} nome={item.nome} preco={item.preco} tipo={"Func"} />
            ) : (
              <PacoteCard
                key={item.id}
                nome={item.nome}
                preco={item.preco}
                duracao={item.duracao}
                tipo="Func"
              />
            )
          )}
        </div>

        {/* Botão Voltar */}
        <div style={{ display:"flex", justifyContent:"center", width: "90%", marginTop: "18px" }}>
          <Botao cor="#d9d9d9" texto="Voltar" onClick={() => {navigate(-1)}}/>
        </div>
      </div>
    </div>
  );
}
