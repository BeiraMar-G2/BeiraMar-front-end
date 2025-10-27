import React, { useState, useEffect } from "react";
import { Header } from "../../Components/Header";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import "../Styles/DashboardCancelamento.css";
import api from "../../Provider/api";
import { HelpModal } from "../../Components/Modal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export function DashboardCancelamento() {
  const navigate = useNavigate();
  const [procedimentoSelecionado, setProcedimentoSelecionado] = useState("Massagem Modeladora");
  const [listaDeTodosOsProcedimentos, definirListaDeTodosOsProcedimentos] = useState([]);
  const [legendaPersonalizada, setLegendaPersonalizada] = useState(null);
  const [servicosMaisCanceladosData, setServicosMaisCanceladosData] = useState([]);
  const [dadosSemanaisDoProcedimento, setDadosSemanaisDoProcedimento] = useState([]);
  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemErroTorta, setMensagemErroTorta] = useState("");

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

  function buscarProcedimentosCancelados() {
      if (!procedimentoSelecionado) return;
  
      api
        .get(`/servicos/cancelamentos-por-dia-semana?nomeServico=${procedimentoSelecionado}`)
        .then((response) => {
          const dadosMapeados = response.data.map((item) => ({
            diaDaSemana: item[0],
            quantidadeRealizacoes: item[1],
          }));
          setDadosSemanaisDoProcedimento(dadosMapeados);
        })
        .catch((error) => {
          setMensagemErro(error.response.data.message);
        });
    }

  function servicosMaisCancelados() {
    api
      .get("/servicos/mais-cancelados")
      .then((response) => {
        console.log("Dados recebidos:", response.data);
        
        if (response.data && Array.isArray(response.data)) {
          if(response.data[0][1] == 0){
            setMensagemErroTorta("Nenhum cancelamento registrado nos últimos 30 dias");
          } else {
            setServicosMaisCanceladosData(response.data);
          }
        } else {
          console.error("Dados não são um array");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar serviços (Mais cancelados):", error);
        setMensagemErroTorta(error.response?.data?.message || "Erro ao buscar dados.");
      });
  }



  useEffect(() => {
    listarServicos();
    servicosMaisCancelados();
  }, []);

  useEffect(() => {
    if (listaDeTodosOsProcedimentos.length > 0) {
      buscarProcedimentosCancelados();
    }
  }, [listaDeTodosOsProcedimentos]);
  
    useEffect(() => {
    if (procedimentoSelecionado) {
      buscarProcedimentosCancelados();
      setMensagemErro("");
    }
  }, [procedimentoSelecionado]);

  const handleVoltar = () => {
    navigate("/Dashboard/Menu");
  };

  // Dados do gráfico de pizza - 5 Procedimentos Mais Cancelados
  const pieData = {
    labels: servicosMaisCanceladosData.length > 0 
      ? servicosMaisCanceladosData.map(item => {
          return item[0]; 
        })
      : [
        ],
    datasets: [
      {
        data: servicosMaisCanceladosData.length > 0
          ? servicosMaisCanceladosData.map(item => {
              return item[1]; // Segundo elemento é a quantidade de cancelamentos
            })
          : "Sem cancelamentos",
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        borderColor: ["#000000", "#000000", "#000000", "#000000", "#000000"],
        borderWidth: 0.5,
        hoverBorderWidth: 1,
        hoverBorderColor: [
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  // Debug do pieData
  console.log("Labels:", pieData.labels);
  console.log("Data:", pieData.datasets[0].data);

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (event, activeElements) => {
      if (activeElements.length > 0) {
        const index = activeElements[0].index;
        
        // Adapta para a estrutura dos dados da API
        let label, value;
        
        if (servicosMaisCanceladosData.length > 0) {
          // Usa os dados da API
          const item = servicosMaisCanceladosData[index];
          label = item[0]; // Nome do serviço
          value = item[1]; // Quantidade de cancelamentos
        } else {
          // Fallback para dados estáticos
          label = pieData.labels[index];
          value = pieData.datasets[0].data[index];
        }
        
        setLegendaPersonalizada({
          nome: label,
          cancelamentos: value,
          cor: pieData.datasets[0].backgroundColor[index],
        });
      }
    },
    layout: {
      padding: {
        right: 20,
        left: 20,
        top: 0,
        bottom: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.parsed} cancelamentos`;
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
  };

  // Dados do gráfico de barras - Cancelamento Por Dia
  const dadosDoGrafico = {
    labels: dadosSemanaisDoProcedimento.map((item) => item.diaDaSemana),
    datasets: [
      {
        label: "Número de Procedimentos Realizados",
        data: dadosSemanaisDoProcedimento.map(
          (item) => item.quantidadeRealizacoes
        ),
        backgroundColor: "#FF6B6B",
        borderColor: "#FF6B6B",
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

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
    <div className="dashboard-cancelamento">
      <div className="dashboard-header">
        <Header
          icone={<i className="fas fa-arrow-left"></i>}
          texto="Voltar"
          cor="#90FCF9"
          alinhamento="flex-start"
          padding="0 20px"
          customAction={handleVoltar}
        />
      </div>

      <div className="dashboard-content">
        <div className="pie-chart-container">
          {mensagemErroTorta ? <h1 className="dashboard-title">
            {mensagemErroTorta}</h1> 
                : (
                  <div>
                    <h1 className="dashboard-title">
                      5 procedimentos com mais cancelamentos
                    </h1>
                    <p className="dashboard-subtitle">(Últimos 30 dias)</p>
                    <div className="chart-wrapper">
                      <Pie data={pieData} options={pieOptions} />
                    </div>

                    <div className="legenda-customizada">
                      {pieData.labels.map((label, index) => (
                        <div key={index} className="legenda-item">
                          <div
                            className="legenda-bolinha"
                            style={{
                              backgroundColor: pieData.datasets[0].backgroundColor[index],
                            }}
                          ></div>
                          <span className="legenda-texto">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) }
          

          {legendaPersonalizada && (
            <div className="legenda-personalizada">
              <div className="legenda-header">
                <div
                  className="legenda-cor"
                  style={{ backgroundColor: legendaPersonalizada.cor }}
                ></div>
                <span className="legenda-nome">
                  {legendaPersonalizada.nome}
                </span>
                <button
                  className="legenda-fechar"
                  onClick={() => setLegendaPersonalizada(null)}
                >
                  ×
                </button>
              </div>
              <div className="legenda-info">
                <span className="legenda-numero">
                  {legendaPersonalizada.cancelamentos}
                </span>
                <span className="legenda-label">cancelamentos</span>
              </div>
            </div>
          )}
        </div>
        

        <div className="procedimento-section">
          <label htmlFor="procedimento-select" className="procedimento-label">
            Procedimento:
          </label>
          <select
            id="procedimento-select"
            className="procedimento-select"
            value={procedimentoSelecionado}
            onChange={(e) => setProcedimentoSelecionado(e.target.value)}
          >
            {listaDeTodosOsProcedimentos.map((procedimento, index) => (
              <option key={index} value={procedimento}>
                {procedimento}
              </option>
            ))}
          </select>
        </div>

        {!procedimentoSelecionado ? (
          <div className="bar-chart-section">
            <p className="chart-title">Selecione um dos procedimentos para visualizar mais informações</p>  
          </div>
          ) : (
          mensagemErro ? (
            <div className="bar-chart-section">
              <p className="chart-title">{mensagemErro}</p>
            </div>
          ) : (
          <div className="bar-chart-section">
            <h3 className="chart-title">Procedimentos Por Dia <HelpModal local="Informações do gráfico" explicacao="O gráfico exibe os dias da semana em que cada procedimento tem mais demanda para que você possa prever sua agenda." /></h3>
            <p className="chart-subtitle">(Últimos 30 dias)</p>

            <div className="chart-wrapper-bar">
              <Bar data={dadosDoGrafico} options={opcoesDoGrafico} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}