import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Provider/api";
import "../Pages/Styles/VisuClientePorDia.css";

export default function VisuClientePorDia() {
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const tamanhoPagina = 4;

  function buscarAgendamentos(pagina = 0) {
    api.get(`/agendamentos/cliente/${sessionStorage.getItem("idUsuario")}/paginado?page=${pagina}&size=${tamanhoPagina}`)
      .then((response) => {
        console.log("Agendamentos do cliente:", response.data);
        console.log("Total de páginas:", response.data.totalPages);
        
        let agendamentosData;
        let paginacao;
        
        if (response.data.content) {
          agendamentosData = response.data.content;
          paginacao = {
            number: response.data.number,
            totalPages: response.data.totalPages,
            totalElements: response.data.totalElements
          };
        } else {
          agendamentosData = response.data;
          paginacao = {
            number: 0,
            totalPages: Math.ceil(response.data.length / tamanhoPagina),
            totalElements: response.data.length
          };
        }

        const agendamentosOrdenados = agendamentosData
          .map((agendamento) => ({
            idAgendamento: agendamento.idAgendamento,
            servicoNome: agendamento.servico.nome,
            dtHora: agendamento.dtHora,
            preco: agendamento.valorPago,
            status: agendamento.status,
          }))
          .sort((a, b) => new Date(a.dtHora) - new Date(b.dtHora));

        setAgendamentos(agendamentosOrdenados);
        setPaginaAtual(paginacao.number);
        setTotalPaginas(paginacao.totalPages);
        setTotalElements(paginacao.totalElements);
        
        console.log("Estados após busca:", {
          paginaAtual: paginacao.number,
          totalPaginas: paginacao.totalPages,
          totalElements: paginacao.totalElements
        });
      })
      .catch((error) => {
        console.error("Erro ao buscar agendamentos do cliente", error);
      });
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

  function cancelarAgendamento(idAgendamento) {
    api
      .put(`/agendamentos/${idAgendamento}`, {
        status: "Cancelado",
      })
      .then(() => {
        console.log("Agendamento cancelado com sucesso");
        buscarAgendamentos(paginaAtual);
      })
      .catch((error) => {
        console.error("Erro ao cancelar agendamento", error);
      });
  }

  function agruparPorDia(agendamentos) {
    const grupos = {};

    agendamentos.forEach((agendamento) => {
      const dataObj = handleDiaAgendamento(agendamento.dtHora);
      const chaveData = `${dataObj.dia}/${dataObj.mes}/${dataObj.ano}`;

      if (!grupos[chaveData]) {
        grupos[chaveData] = {
          dataFormatada: formatarDataCompleta(dataObj),
          agendamentos: [],
        };
      }

      grupos[chaveData].agendamentos.push(agendamento);
    });

    return grupos;
  }

  function irParaPagina(novaPagina) {
    if (novaPagina >= 0 && novaPagina < totalPaginas) {
      buscarAgendamentos(novaPagina);
    }
  }

  function paginaAnterior() {
    irParaPagina(paginaAtual - 1);
  }

  function proximaPagina() {
    irParaPagina(paginaAtual + 1);
  }

  useEffect(() => {
    buscarAgendamentos();
  }, []);

  const agendamentosAgrupados = agruparPorDia(agendamentos);
  
  return (
    <div>
      <div className="agendamentos">

        {/* Controles de paginação superiores */}
        {totalPaginas > 1 && (
          <div className="paginacao">
            <button 
              onClick={paginaAnterior} 
              disabled={paginaAtual === 0}
            >
              ‹
            </button>
            <span className="page-info">
              {paginaAtual + 1} de {totalPaginas}
            </span>
            <button 
              onClick={proximaPagina} 
              disabled={paginaAtual === totalPaginas - 1}
            >
              ›
            </button>
          </div>
        )}

        <div className="agenda-content">
          {Object.keys(agendamentosAgrupados).length > 0 ? (
            Object.entries(agendamentosAgrupados).map(([data, grupo]) => (
              <div key={data}>
                <h3>{grupo.dataFormatada}</h3>
                {grupo.agendamentos.map((agendamento) => (
                  <div key={agendamento.idAgendamento} className="card-visu card-pacotecard">
                    <div className="hora">{handleHorario(agendamento.dtHora)}</div>
                    <div className="info">
                      <div>
                        <p>
                          <strong>Serviço:</strong> {agendamento.servicoNome}
                        </p>
                        <p>
                          <strong>Preço:</strong> R$ {agendamento.preco},00
                        </p>
                        {agendamento.status && (
                          <p>
                            <strong>Status:</strong> 
                            {agendamento.status === "Concluido" && " ✔ Realizado"}
                            {agendamento.status === "Cancelado" && " ✖ Cancelado"}
                            {agendamento.status !== "Concluido" &&
                              agendamento.status !== "Cancelado" &&
                              ` ${agendamento.status}`}
                          </p>
                        )}
                      </div>
                      {agendamento.status !== "Cancelado" && agendamento.status !== "Concluido" && (
                        <button 
                          className="cancelar"
                          onClick={() => cancelarAgendamento(agendamento.idAgendamento)}
                        >
                          ⚠ Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>Sem agendamentos...</p>
          )}
        </div>

      </div>

      {agendamentos.length === 0 && (
        <p className="mensagem-final">
          <em>
            Sem mais agendamentos... <br /> Faça sua reserva hoje!
          </em>
        </p>
      )}
    </div>
  );
}
