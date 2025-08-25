import { Subtitulo } from "../Components/Fontes";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import "../Pages/Styles/Card.css";

export function PacoteCard({ nome, preco }) {
  return (
    <div className="card">
          <Subtitulo texto={nome}/>
      <div className="card-section">

        <div className="conteudo-card">
          <span className="text-sm text-gray-700 font-semibold">R$ {preco},00</span>
        </div>

        <div className="card-modificacoes">
          <button className="p-2 rounded-full hover:bg-red-300 transition">
            <LuNotebookPen size={"100%"} />
          </button>
          <button className="p-2 rounded-full hover:bg-red-300 transition">
            <FaTrashAlt size={"100%"}/>
          </button>
        </div>
      </div>


    </div>
  );
}
