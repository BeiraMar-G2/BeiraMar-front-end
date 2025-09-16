import React, { useState, useEffect } from "react";
import api from "../Provider/api";
import "../Pages/Styles/VisuAtendPorDia.css";

export default function VisuAtendPorDia() {
  const [selecionado, setSelecionado] = useState(null);
  const [consultas, setConsultas] = useState([]);

  function buscarAgendamentos() {
    api
      .get(`/agendamentos`)
      .then((response) => {
        console.log(response.data);
        setConsultas(
          response.data.map((agendamento) => ({
            idAgendamento: agendamento.idAgendamento,
            servico: agendamento.servico.nome,
            cliente: agendamento.cliente.nome,
            atendente: agendamento.funcionario.nome,
            dtHora: agendamento.dtHora, 
            preco: agendamento.valorPago,
            status: agendamento.status,
          }))
        );
      })
      .catch((error) => {
        console.error("Erro ao buscar agendamentos do cliente", error);
      });
  }

  function confirmarConsulta() {
    if (selecionado !== null) {
      const consultaAtualizada = { ...consultas[selecionado] };

      api
        .put(`/agendamentos/${consultaAtualizada.idAgendamento}`, {
          status: "Concluido",
        })
        .then(() => {
          setConsultas((prev) =>
            prev.map((consulta, idx) =>
              idx === selecionado
                ? { ...consulta, status: "Concluido" }
                : consulta
            )
          );
          setSelecionado(null);
        })
        .catch((error) => {
          console.error("Erro ao confirmar consulta", error);
        });
    }
  }

  function cancelarConsulta() {
    if (selecionado !== null) {
      const consultaAtualizada = { ...consultas[selecionado] };

      api
        .put(`/agendamentos/${consultaAtualizada.idAgendamento}`, {
          status: "Cancelado",
        })
        .then(() => {
          setConsultas((prev) =>
            prev.map((consulta, idx) =>
              idx === selecionado
                ? { ...consulta, status: "Cancelado" }
                : consulta
            )
          );
          setSelecionado(null);
        })
        .catch((error) => {
          console.error("Erro ao cancelar consulta", error);
        });
    }
  }

  function formatarDataCompleta({ dia, mes, ano }) {
    const meses = {
      1: "Janeiro",
      2: "Fevereiro",
      3: "Março",
      4: "Abril",
      5: "Maio",
      6: "Junho",
      7: "Julho",
      8: "Agosto",
      9: "Setembro",
      10: "Outubro",
      11: "Novembro",
      12: "Dezembro",
    };

    const diasSemana = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];

    const data = new Date(Number(ano), Number(mes) - 1, Number(dia));
    const nomeDiaSemana = diasSemana[data.getDay()];

    return `${dia} de ${meses[Number(mes)]} de ${ano} - ${nomeDiaSemana}`;
  }

  function handleDiaAgendamento(dateString) {
    const date = new Date(dateString);

    const dia = date.getDate().toString().padStart(2, "0");
    const mes = (date.getMonth() + 1).toString().padStart(2, "0");
    const ano = date.getFullYear();
    return { dia, mes, ano };
  }

  function handleHorario(dateString) {
    const date = new Date(dateString);
    const horas = date.getHours().toString().padStart(2, "0");
    const minutos = date.getMinutes().toString().padStart(2, "0");
    return `${horas}:${minutos}`;
  }

  function agruparPorDia(consultas) {
    const grupos = {};

    consultas.forEach((consulta, idx) => {
      const dataObj = handleDiaAgendamento(consulta.dtHora);
      const chaveData = `${dataObj.dia}/${dataObj.mes}/${dataObj.ano}`;

      if (!grupos[chaveData]) {
        grupos[chaveData] = {
          dataFormatada: formatarDataCompleta(dataObj),
          agendamentos: [],
        };
      }

      grupos[chaveData].agendamentos.push({ ...consulta, indiceOriginal: idx });
    });

    return grupos;
  }

  useEffect(() => {
    buscarAgendamentos();
  }, []);

  const agendamentosAgrupados = agruparPorDia(consultas);

  return (
    <div className="agenda">
      {Object.keys(agendamentosAgrupados).length > 0 ? (
        Object.entries(agendamentosAgrupados).map(([data, grupo]) => (
          <div key={data} className="grupo-dia">
            <h3>{grupo.dataFormatada}</h3>
            {grupo.agendamentos.map((consulta) => (
              <div
                key={consulta.idAgendamento}
                className={`consulta${
                  selecionado === consulta.indiceOriginal ? " selecionado" : ""
                }${consulta.status ? " destaque" : ""}`}
                onClick={() => setSelecionado(consulta.indiceOriginal)}
              >
                <div className="hora">{handleHorario(consulta.dtHora)}</div>
                <div className="info">
                  <p>
                    <strong>Cliente:</strong> {consulta.cliente}
                  </p>
                  <p>
                    <strong>Responsável:</strong> {consulta.atendente}
                  </p>
                  <p>
                    <strong>Serviço:</strong> {consulta.servico}
                  </p>
                  {consulta.status && (
                    <div className="status">
                      <span>
                        {consulta.status === "Concluido" && "✔ Consulta Realizada"}
                        {consulta.status === "Cancelado" && "✖ Consulta Cancelada"}
                        {consulta.status !== "Concluido" &&
                          consulta.status !== "Cancelado" &&
                          consulta.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>Sem agendamentos...</p>
      )}

      <div className="acoes">
        <button className="confirmar" onClick={confirmarConsulta}>
          Confirmar
        </button>
        <button className="cancelar" onClick={cancelarConsulta}>
          Cancelar
        </button>
      </div>
    </div>
  );
}