import { useState } from "react";
import { Input } from "../../Components/Input";
import { Header } from "../../Components/Header";
import { PacoteCard } from "../../Components/PacoteCard";
import { FaHouse } from "react-icons/fa6";
import "../../Pages/Styles/PacotesCadastrados.css";

export function PacotesCadastrados() {
  const [search, setSearch] = useState("");

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

  const filtrados = pacotes.filter((p) =>
    p.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      <Header
        alinhamento="flex-start"
        padding="0 10px"
        icone={<FaHouse size={28} />}
        texto="Retornar ao Menu"
      />

      <h2 className="titulo-tela">Pacotes Cadastrados</h2>

      <select className="w-64 border rounded-lg p-2 mb-2">
        <option>Pacotes</option>
        <option>Serviços</option>
      </select>

      {/* Pesquisa */}
      <Input className="input-pesquisa"
        placeholder="Pesquisar serviços..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Lista de Pacotes */}
      <div className="flex flex-col gap-3 w-72 overflow-y-auto max-h-96">
        {filtrados.map((p) => (
          <PacoteCard
            key={p.id}
            nome={p.nome}
            preco={p.preco}
          />
        ))}
      </div>

      {/* Botão Voltar */}
    </div>
  );
}
