import { Subtitulo } from "../Components/Fontes";
import { FaTrashAlt } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { FaRegCalendarPlus } from "react-icons/fa";
import "../Pages/Styles/Card.css";

export function PacoteCard({ nome, preco, duracao, tipo}) {
  return (
    <div className="card">
          <Subtitulo texto={nome}/>
      <div className="card-section">

        <div className="conteudo-card">
          {duracao && <span className="text-sm text-gray-700 font-semibold">{duracao}</span>}
          <span className="text-sm text-gray-700 font-semibold">R$ {preco},00</span>
        </div>


        {tipo == "Func" ? (
            <div className="card-modificacoes">
                <button className="p-2 rounded-full hover:bg-red-300 transition">
                    <LuNotebookPen size={"100%"} />
                </button>
                <button className="p-2 rounded-full hover:bg-red-300 transition">
                    <FaTrashAlt size={"100%"}/>
                </button>
            </div>
        ) : (
            <div>
                <button className="botao-agendar">
                Agendar 
                <FaRegCalendarPlus />
                </button>
            </div>
        )}
      </div>


    </div>
  );
}
