import React, { useState } from "react";

export default function VisuAtendPorDia() {
  const [selecionado, setSelecionado] = useState(null);
  const [consultas, setConsultas] = useState([
    {
      hora: "11:30",
      cliente: "Gisele",
      servico: "Massagem Modeladora"
    },
    {
      hora: "14:40",
      cliente: "Roberta",
      servico: "Design de Sobrancelha"
    },
    {
      hora: "16:30",
      cliente: "Maria",
      servico: "Drenagem"
    },
    {
      hora: "17:30",
      cliente: "Cristina",
      servico: "Massagem Modeladora"
    }
  ]);

  function confirmarConsulta() {
    if (selecionado !== null) {
      setConsultas(prev =>
        prev.map((consulta, idx) =>
          idx === selecionado
            ? { ...consulta, status: "✔ Consulta Realizada" }
            : consulta
        )
      );
    }
  }

  function cancelarConsulta() {
    if (selecionado !== null) {
      setConsultas(prev =>
        prev.map((consulta, idx) =>
          idx === selecionado
            ? { ...consulta, status: undefined }
            : consulta
        )
      );
    }
  }

  return (
    <div className="agenda">
      <h3>21 de Maio de 2025 - Quarta Feira</h3>

      {consultas.map((consulta, idx) => (
        <div
          key={idx}
          className={`consulta${selecionado === idx ? " selecionado" : ""}${consulta.status ? " destaque" : ""}`}
          onClick={() => setSelecionado(idx)}
        >
          <div className="hora">{consulta.hora}</div>
          <div className="info">
            <p><strong>Cliente:</strong> {consulta.cliente}</p>
            <p><strong>Serviço:</strong> {consulta.servico}</p>
            {consulta.status && (
              <div className="status">
                <span>{consulta.status}</span>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="acoes">
        <button className="confirmar" onClick={confirmarConsulta}>Confirmar</button>
        <button className="cancelar" onClick={cancelarConsulta}>Cancelar</button>
      </div>
    </div>
  );
}
