import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Provider/api";

export default function VisuClientePorDia() {
  const navigate = useNavigate();
  const [agendamentos, setAgendamentos] = useState([]);

  function buscarAgendamentos() {
    api.get(`/agendamentos/cliente/${localStorage.getItem("idUsuario")}`)
      .then((response) => {
        console.log("Agendamentos do cliente:", response.data);
        const agendamentosOrdenados = response.data
          .map((agendamento) => ({
            idAgendamento: agendamento.idAgendamento,
            servicoNome: agendamento.servico.nome,
            dtHora: agendamento.dtHora,
            preco: agendamento.valorPago,
          }))
          .sort((a, b) => new Date(a.dtHora) - new Date(b.dtHora)); // Ordena por data e hora

        setAgendamentos(agendamentosOrdenados);
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

  useEffect(() => {
    buscarAgendamentos();
  }, []);

  return (
    <div>
      <div className="agendamentos">
        {agendamentos && agendamentos.length > 0 ? (
          agendamentos.map((servico) => (
            <div key={servico.idAgendamento}>
              <h3>
                {formatarDataCompleta(handleDiaAgendamento(servico.dtHora))}
              </h3>
              <div className="card-visu card-pacotecard">
                <div className="hora">{handleHorario(servico.dtHora)}</div>
                <div className="info">
                  <div>
                    <p>
                      <strong>Serviço:</strong> {servico.servicoNome}
                    </p>
                    <p>
                      <strong>Preço:</strong> R$ {servico.preco},00
                    </p>
                  </div>
                  <button className="cancelar">⚠ Cancelar</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Sem agendamentos...</p>
        )}
      </div>

      {/* Mensagem final */}
      <p className="mensagem-final">
        <em>
          Sem mais agendamentos... <br /> Faça sua reserva hoje!
        </em>
      </p>
    </div>
  );
}
