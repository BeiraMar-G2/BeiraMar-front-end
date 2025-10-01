import React, { useState } from 'react';
import { Header } from '../../Components/Header';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import '../Styles/DashboardCancelamento.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export function DashboardCancelamento() {
  const navigate = useNavigate();
  const [procedimentoSelecionado, setProcedimentoSelecionado] = useState('Massagem Modeladora');

  const handleVoltar = () => {
    navigate('/Dashboard/Menu');
  };

  const [legendaPersonalizada, setLegendaPersonalizada] = useState(null);

  // Dados do gráfico de pizza - 5 Procedimentos Mais Cancelados
  const pieData = {
    labels: [
      'Massagem Modeladora', 
      'Design de Sobrancelhas com Henna', 
      'Detox Corporal', 
      'Drenagem Linfática', 
      'Limpeza de Pele'
    ],
    datasets: [
      {
        data: [25, 18, 12, 8, 5],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        borderColor: ['#000000', '#000000', '#000000', '#000000', '#000000'],
        borderWidth: 0.5,
        hoverBorderWidth: 1,
        hoverBorderColor: ['#000000', '#000000', '#000000', '#000000', '#000000'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: (event, activeElements) => {
      if (activeElements.length > 0) {
        const index = activeElements[0].index;
        const label = pieData.labels[index];
        const value = pieData.datasets[0].data[index];
        setLegendaPersonalizada({
          nome: label,
          cancelamentos: value,
          cor: pieData.datasets[0].backgroundColor[index]
        });
      }
    },
    layout: {
      padding: {
        right: 20,
        left: 20,
        top: 0,
        bottom: 0
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed} cancelamentos`;
          }
        }
      }
    },
    elements: {
      arc: {
        borderWidth: 1
      }
    }
  };

  // Dados do gráfico de barras - Cancelamento Por Dia
  const barData = {
    labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    datasets: [
      {
        label: 'Cancelamentos',
        data: [8, 5, 12, 3, 9, 6],
        backgroundColor: '#FF6B6B',
        borderColor: '#FF6B6B',
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
          title: function(context) {
            return `Dia ${context[0].label}`;
          },
          label: function(context) {
            return `${context.parsed.y} cancelamentos`;
          }
        }
      }
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
        max: 10,
        ticks: {
          stepSize: 2,
          font: {
            size: 12,
          },
        },
        grid: {
          color: '#E5E5E5',
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
          <h1 className="dashboard-title">5 procedimentos com mais cancelamentos</h1>
          <p className="dashboard-subtitle">Clique para mais detalhes</p>
          <div className="chart-wrapper">
            <Pie data={pieData} options={pieOptions} />
          </div>
          
          <div className="legenda-customizada">
            {pieData.labels.map((label, index) => (
              <div key={index} className="legenda-item">
                <div 
                  className="legenda-bolinha" 
                  style={{ backgroundColor: pieData.datasets[0].backgroundColor[index] }}
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
                <span className="legenda-nome">{legendaPersonalizada.nome}</span>
                <button 
                  className="legenda-fechar"
                  onClick={() => setLegendaPersonalizada(null)}
                >
                  ×
                </button>
              </div>
              <div className="legenda-info">
                <span className="legenda-numero">{legendaPersonalizada.cancelamentos}</span>
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
            <option value="Massagem Modeladora">Massagem Modeladora</option>
            <option value="Drenagem Linfática">Drenagem Linfática</option>
            <option value="Hidrolipo NA">Hidrolipo NA</option>
            <option value="Massagem Relaxante">Massagem Relaxante</option>
            <option value="Aplicação de Enzimas">Aplicação de Enzimas</option>
            <option value="Limpeza de Pele">Limpeza de Pele</option>
            <option value="Design de Sobrancelhas com Henna">Design de Sobrancelhas com Henna</option>
            <option value="Design Simples de Sobrancelhas">Design Simples de Sobrancelhas</option>
            <option value="Depilação Facial">Depilação Facial</option>
            <option value="Detox Corporal">Detox Corporal</option>
            <option value="Pump Up (Glúteos) + Eletroestimulação">Pump Up (Glúteos) + Eletroestimulação</option>
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
