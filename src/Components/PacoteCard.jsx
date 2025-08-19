export default function PacoteCard({ nome, duracao, preco }) {
  return (
    <div className="bg-red-200 shadow-md rounded-xl p-3 flex justify-between items-center">
      <div>
        <p className="font-medium text-sm">{nome}</p>
        <p className="text-sm text-gray-600">Duração: {duracao}</p>
        <p className="text-sm text-gray-700 font-semibold">R$ {preco},00</p>
      </div>

      <div className="flex gap-2">
        <button className="p-2 rounded-full hover:bg-red-300 transition">
          ✏️
        </button>
        <button className="p-2 rounded-full hover:bg-red-300 transition">
          🗑️
        </button>
      </div>
    </div>
  );
}
