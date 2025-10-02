import React, { useEffect, useState } from "react";
import { Header } from "../../Components/Header";
import "../Styles/DashboardRealizado.css";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import api from "../../Provider/api";
import { useLocation } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function DashboardRealizado() {
  const {rankingProcedimentos = []} = useLocation().state || {};
  const [rankingMenosAgendados, setRankingMenosAgendados] = useState([]);

  // Lista completa de todos os procedimentos disponíveis
  const [listaDeTodosOsProcedimentos, definirListaDeTodosOsProcedimentos] = useState([]);

  // Ranking dos procedimentos mais realizados (favoritos)
  const rankingProcedimentosMaisRealizados = rankingProcedimentos.length > 0 ? rankingProcedimentos.map((item, index) => ({
    colocacao: `${index + 1}°`,
    nomeProcedimento: item[1],
    totalRealizacoes: item[2],
  })) : [];

  // Ranking dos procedimentos com menor demanda (em queda)
  const rankingProcedimentosComMenorDemanda = rankingMenosAgendados.length > 0 ? rankingMenosAgendados.map((item, index) => ({
    colocacao: `${index + 1}°`,
    nomeProcedimento: item[1], 
    totalRealizacoes: item[2],  
  })) : [];

  // Dados semanais do procedimento selecionado (simulados para demonstração)
  const [dadosSemanaisDoProcedimento, setDadosSemanaisDoProcedimento] = useState([
    { diaDaSemana: "Segunda", quantidadeRealizacoes: 28 }
  ]);
  
  const navegador = useNavigate();
  const [procedimentoAtualSelecionado, definirProcedimentoSelecionado] =
  useState("Massagem Modeladora");
  
  const voltarParaDashboardMenu = () => {
    navegador("/Dashboard/Menu");
  };

  function buscarProcedimentosRealizados(){
    const procedimentoParaBuscar = procedimentoAtualSelecionado || listaDeTodosOsProcedimentos[0];
  
  if (!procedimentoParaBuscar) return;

    api.get(`/servicos/agendamentos-por-dia-semana?nomeServico=${procedimentoParaBuscar}`)
    .then((response) => {
      console.log('Agendamentos por dia da semana:', response.data);
      const dadosMapeados = response.data.map((item) => ({
        diaDaSemana: item[0],
        quantidadeRealizacoes: item[1],
      }));
      
      setDadosSemanaisDoProcedimento(dadosMapeados);
    })
    .catch((error) => {
      console.error('Erro ao buscar agendamentos por dia da semana:', error);
    });
  }
  

  const alterarProcedimentoSelecionado = (evento) => {
    setDadosSemanaisDoProcedimento([]);
    definirProcedimentoSelecionado(evento.target.value);
  };

  function listarServicos() {
    api
      .get("/servicos")
      .then((response) => {
        console.log("Serviços encontrados:", response);
          const nomesServicos = response.data.map((servico) => servico.nome);
      definirListaDeTodosOsProcedimentos(nomesServicos);
      })
      .catch((error) => {
        console.error("Erro ao buscar serviços:", error);
      });
  }

  function servicosMenosAgendados() {
    api
      .get("/servicos/top3-menos-agendados")
      .then((response) => {
        console.log("Serviços encontrados:", response);
        setRankingMenosAgendados(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar serviços:", error);
      });
  }

  useEffect(() => {
    listarServicos();
    servicosMenosAgendados();
  }, []);

  useEffect(() => {
  if (listaDeTodosOsProcedimentos.length > 0) {
    buscarProcedimentosRealizados();
  }
}, [listaDeTodosOsProcedimentos]);

useEffect(() => {
  if (procedimentoAtualSelecionado) {
    buscarProcedimentosRealizados();
  }
}, [procedimentoAtualSelecionado]);

  // Configuração dos dados para o gráfico de barras
  const dadosDoGrafico = {
    labels: dadosSemanaisDoProcedimento.map((item) => item.diaDaSemana),
    datasets: [
      {
        label: "Número de Procedimentos Realizados",
        data: dadosSemanaisDoProcedimento.map(
          (item) => item.quantidadeRealizacoes
        ),
        backgroundColor: "#90FCF9",
        borderColor: "#7BE3E0",
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  // Opções de configuração visual do gráfico
  const opcoesDoGrafico = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#90FCF9",
        borderWidth: 1,
        displayColors: false,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: function (contexto) {
            return `${contexto.parsed.y} procedimentos realizados`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
          color: "#666",
          font: {
            size: 12,
            family: "Arial, sans-serif",
          },
        },
        grid: {
          color: "#e0e0e0",
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          color: "#333",
          font: {
            size: 12,
            family: "Arial, sans-serif",
            weight: "500",
          },
        },
        grid: {
          display: false,
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 4,
        borderSkipped: false,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    layout: {
      padding: {
        top: 20,
        bottom: 10,
      },
    },
  };

  return (
    <div className="dashboard-realizado">
      <Header
        icone={<i className="fas fa-arrow-left"></i>}
        texto="Voltar"
        cor="#90FCF9"
        alinhamento="flex-start"
        padding="0 20px"
        customAction={voltarParaDashboardMenu}
      />

      <div className="dashboard-content">
        <div className="procedimentos-container">
          <div className="procedimentos-section">
            <h2 className="section-title">Procedimentos Favoritos</h2>
            <div className="procedimentos-list">
              {rankingProcedimentosMaisRealizados.map(
                (procedimento, indice) => (
                  <div key={indice} className="procedimento-item favorito">
                    <span className="procedimento-posicao">
                      {procedimento.colocacao}
                    </span>
                    <span className="procedimento-nome">
                      {procedimento.nomeProcedimento}
                    </span>
                    <span className="procedimento-quantidade">
                      {procedimento.totalRealizacoes}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="procedimentos-section">
            <h2 className="section-title">Procedimentos Em Queda</h2>
            <div className="procedimentos-list">
              {rankingProcedimentosComMenorDemanda.map(
                (procedimento, indice) => (
                  <div key={indice} className="procedimento-item queda">
                    <span className="procedimento-posicao">
                      {procedimento.colocacao}
                    </span>
                    <span className="procedimento-nome">
                      {procedimento.nomeProcedimento}
                    </span>
                    <span className="procedimento-quantidade">
                      {procedimento.totalRealizacoes}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="grafico-section">
          <div className="periodo-container">
            <label className="periodo-label">Procedimento</label>
            <select
              className="periodo-select"
              value={procedimentoAtualSelecionado}
              onChange={alterarProcedimentoSelecionado}
            >
              <option value="" disabled>Selecione um procedimento</option>
              {listaDeTodosOsProcedimentos.map((nomeDoProcedimento) => (
                <option id={nomeDoProcedimento} key={nomeDoProcedimento} value={nomeDoProcedimento}>
                  {nomeDoProcedimento}
                </option>
              ))}
            </select>
          </div>

          <div className="grafico-container">
            <h3 className="grafico-title">Procedimentos Por Dia</h3>
            <p className="grafico-subtitle">(Últimos 30 dias)</p>

            <div className="chart-wrapper">
              <Bar data={dadosDoGrafico} options={opcoesDoGrafico} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
