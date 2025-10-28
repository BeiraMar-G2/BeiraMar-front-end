import api from "../Provider/api";
import { useEffect, useState } from "react";

export default function HistoricoAgendamento(props) {
  const [historico, setHistorico] = useState([]);
  const [dataSelecionada, setDataSelecionada] = useState(() => new Date());
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  function buscarHistorico(pagina = 0) {
    const dataISO = dataSelecionada.toISOString();
    const dataFormatada = dataISO.replace("Z", "");

    api
      .get(`/agendamentos/historico/paginado?idCliente=${props.cliente || sessionStorage.getItem("idUsuario")}&data=${dataFormatada}&page=${pagina}&size=3`)
      .then((response) => {
        console.log(response.data);
        setHistorico(response.data.content);
        setTotalPaginas(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Erro ao buscar histórico de agendamentos", error);
      });
  }

  useEffect(() => {
    buscarHistorico(paginaAtual); // Chama a função com a página atual
  }, [props.cliente, dataSelecionada, paginaAtual]);

  function paginaAnterior() {
    if (paginaAtual > 0) {
      setPaginaAtual(paginaAtual - 1);
    }
  }

  function proximaPagina() {
    if (paginaAtual < totalPaginas - 1) {
      setPaginaAtual(paginaAtual + 1);
    }
  }

  return (
    <div className="agendamentos">
      {historico.map((agendamento, index) => {
        const dataHora = agendamento?.dtHora ? new Date(agendamento.dtHora) : null;

        return (
          <div key={agendamento?.id || index}>
            <h3>
              {dataHora
                ? dataHora.toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    weekday: "long",
                  })
                : "Data não disponível"}
            </h3>
            <div className="agendamento">
              <div className="hora">
                {dataHora
                  ? dataHora.toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Horário não disponível"}
              </div>
              <div className="info">
                <p>
                  <strong>Serviço:</strong> {agendamento?.servico?.nome}
                </p>
                <p>
                  <strong>Preço:</strong> R$ {agendamento?.servico?.preco}
                </p>
                <button
                  className={`status ${
                    agendamento?.status === "Concluído" ? "concluido" : ""
                  }`}
                >
                  {agendamento?.status || "Concluído"}
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Botões de paginação */}
      <div className="paginacao">
        <button onClick={paginaAnterior} disabled={paginaAtual === 0}>
          ‹ Anterior
        </button>
        <span>
          Página {paginaAtual + 1} de {totalPaginas}
        </span>
        <button onClick={proximaPagina} disabled={paginaAtual === totalPaginas - 1}>
          Próximo ›
        </button>
      </div>

      {/* Mensagem final */}
      {historico.length === 0 && (
        <p className="mensagem-final">
          <em>Sem mais agendamentos... <br /> Faça sua reserva hoje!</em>
        </p>
      )}
    </div>
  );
}