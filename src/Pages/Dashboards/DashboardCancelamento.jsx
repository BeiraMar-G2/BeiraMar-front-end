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

  function servicosMaisCancelados() {
    api
      .get("/servicos/mais-cancelados")
      .then((response) => {
        console.log("Dados recebidos:", response.data);
        console.log("Tipo dos dados:", typeof response.data);
        console.log("É array?", Array.isArray(response.data));
        
        if (response.data && Array.isArray(response.data)) {
          setServicosMaisCanceladosData(response.data);
        } else {
          console.error("Dados não são um array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar serviços (Mais cancelados):", error);
      });
  }



  useEffect(() => {
    listarServicos();
    servicosMaisCancelados();
  }, []);

  const handleVoltar = () => {
    navigate("/Dashboard/Menu");
  };

  // Dados do gráfico de pizza - 5 Procedimentos Mais Cancelados
  const pieData = {
    labels: servicosMaisCanceladosData.length > 0 
      ? servicosMaisCanceladosData.map(item => {
          console.log("Item no map:", item);
          return item[0]; // Primeiro elemento é o nome do serviço
        })
      : [
          "Massagem Modeladora",
          "Design de Sobrancelhas com Henna",
          "Detox Corporal",
          "Drenagem Linfática",
          "Limpeza de Pele",
        ],
    datasets: [
      {
        data: servicosMaisCanceladosData.length > 0
          ? servicosMaisCanceladosData.map(item => {
              console.log("Valor no map:", item[1]);
              return item[1]; // Segundo elemento é a quantidade de cancelamentos
            })
          : [25, 18, 12, 8, 5],
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
  console.log("pieData completo:", pieData);
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
  const barData = {
    labels: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    datasets: [
      {
        label: "Cancelamentos",
        data: [8, 5, 12, 3, 9, 6],
        backgroundColor: "#FF6B6B",
        borderColor: "#FF6B6B",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            return `Dia ${context[0].label}`;
          },
          label: function (context) {
            return `${context.parsed.y} cancelamentos`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 15,
        ticks: {
          stepSize: 3,
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#E5E5E5",
        },
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
          <h1 className="dashboard-title">
            5 procedimentos com mais cancelamentos
          </h1>
          <p className="dashboard-subtitle">Clique para mais detalhes</p>
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

        <div className="bar-chart-section">
          <h2 className="chart-title">Cancelamento Por Dia</h2>
          <p className="chart-subtitle">(Últimos 30 dias)</p>

          <div className="bar-chart-container">
            <div className="chart-wrapper-bar">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}