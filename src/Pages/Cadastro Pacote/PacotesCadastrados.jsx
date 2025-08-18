import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Menu from "./Menu";
import PacoteCard from "./PacoteCard";

export default function PacotesCadastrados() {
  const [search, setSearch] = useState("");

  const pacotes = [
    { id: 1, nome: "3 Massagens Modeladoras + 2 Drenagens Linfáticas", duracao: "1h30", preco: 470 },
    { id: 2, nome: "3 Hidrolipo NA + 3 Detox Corporal", duracao: "2h", preco: 630 },
    { id: 3, nome: "3 Aplicações de Enzimas + 2 Drenagens Linfáticas", duracao: "2h15", preco: 840 },
  ];

  const filtrados = pacotes.filter((p) =>
    p.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      {/* Header / Menu */}
      <Menu />

      <h2 className="text-lg font-semibold mb-2">Pacotes Cadastrados</h2>

      {/* Dropdown */}
      <select className="w-64 border rounded-lg p-2 mb-2">
        <option>Pacotes</option>
      </select>

      {/* Pesquisa */}
      <Input
        placeholder="Pesquisar serviços..."
        className="w-64 mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Lista de Pacotes */}
      <div className="flex flex-col gap-3 w-72 overflow-y-auto max-h-96">
        {filtrados.map((p) => (
          <PacoteCard key={p.id} nome={p.nome} duracao={p.duracao} preco={p.preco} />
        ))}
      </div>

      {/* Botão Voltar */}
      <Button className="mt-4 w-32">Voltar</Button>
    </div>
  );
}
