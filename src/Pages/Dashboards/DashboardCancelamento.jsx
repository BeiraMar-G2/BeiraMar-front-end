import { useState, useEffect } from "react";
import { Header } from "../../Components/Header";
import { useNavigation } from "../../Hooks/useNavigation";
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
  const { handleNavigate } = useNavigation();
  const [procedimentoSelecionado, setProcedimentoSelecionado] = useState("");
  const [listaDeTodosOsProcedimentos, definirListaDeTodosOsProcedimentos] = useState([]);
  const [legendaPersonalizada, setLegendaPersonalizada] = useState(null);
  const [servicosMaisCanceladosData, setServicosMaisCanceladosData] = useState([]);
  const [dadosSemanaisDoProcedimento, setDadosSemanaisDoProcedimento] = useState([]);
  const [mensagemErro, setMensagemErro] = useState("");
  const [mensagemErroTorta, setMensagemErroTorta] = useState("");
  
  // Estados para o filtro de data
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [mostrarFiltro, setMostrarFiltro] = useState(false);

  function listarServicos() {
    api
      .get("/servicos")
      .then((response) => {
        const nomesServicos = response.data.map((servico) => servico.nome);
        definirListaDeTodosOsProcedimentos(nomesServicos);
      })
      .catch((error) => {
        // Erro ao buscar serviços
      });
  }

  function buscarProcedimentosCancelados(inicio = null, fim = null) {
      if (!procedimentoSelecionado) return;
      
      let dataInicio, dataFim;
      if (inicio && fim) {
        dataInicio = `${inicio}T00:00:00`;
        dataFim = `${fim}T23:59:59`;
      } else {
        const hoje = new Date();
        dataFim = hoje.toISOString().split('T')[0] + 'T23:59:59';
        const trinta_dias_atras = new Date(hoje.getTime() - 30 * 24 * 60 * 60 * 1000);
        dataInicio = trinta_dias_atras.toISOString().split('T')[0] + 'T00:00:00';
      }
      
      const queryParams = `?nomeServico=${encodeURIComponent(procedimentoSelecionado)}&dataInicio=${encodeURIComponent(dataInicio)}&dataFim=${encodeURIComponent(dataFim)}`;
  
      api
        .get(`/servicos/cancelamentos-por-dia-semana${queryParams}`)
        .then((response) => {
          const dadosMapeados = response.data.map((item) => ({
            diaDaSemana: item[0],
            quantidadeRealizacoes: item[1],
          }));
          setDadosSemanaisDoProcedimento(dadosMapeados);
        })
        .catch((error) => {
          setMensagemErro(error.response?.data?.message || 'Erro ao buscar dados');
        });
    }

  function servicosMaisCancelados(inicio = null, fim = null) {
    let dataInicio, dataFim;
    if (inicio && fim) {
      dataInicio = `${inicio}T00:00:00`;
      dataFim = `${fim}T23:59:59`;
    } else {
      const hoje = new Date();
      dataFim = hoje.toISOString().split('T')[0] + 'T23:59:59';
      const trinta_dias_atras = new Date(hoje.getTime() - 30 * 24 * 60 * 60 * 1000);
      dataInicio = trinta_dias_atras.toISOString().split('T')[0] + 'T00:00:00';
    }
    
    const queryParams = `?dataInicio=${encodeURIComponent(dataInicio)}&dataFim=${encodeURIComponent(dataFim)}`;
    
    api
      .get(`/servicos/mais-cancelados${queryParams}`)
      .then((response) => {
        if (response.data && Array.isArray(response.data)) {
          if(response.data.length === 0 || response.data[0][1] === 0){
            setMensagemErroTorta("Nenhum cancelamento registrado nos últimos 30 dias");
          } else {
            setServicosMaisCanceladosData(response.data);
          }
        } else {
          setMensagemErroTorta("Nenhum cancelamento registrado nos últimos 30 dias");
        }
      })
      .catch((error) => {
        setMensagemErroTorta(error.response?.data?.message || "Erro ao buscar dados.");
      });
  }

  const handleFiltrar = () => {
    if (dataInicio && dataFim) {
      buscarProcedimentosCancelados(dataInicio, dataFim);
      servicosMaisCancelados(dataInicio, dataFim);
    } else {
      alert('Por favor, selecione ambas as datas');
    }
  };

  const handleLimparFiltro = () => {
    setDataInicio('');
    setDataFim('');
    buscarProcedimentosCancelados();
    servicosMaisCancelados();
  };

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
      buscarProcedimentosCancelados(dataInicio || null, dataFim || null);
      setMensagemErro("");
    }
  }, [procedimentoSelecionado]);

  const handleVoltar = () => {
    handleNavigate("/Dashboard/Menu");
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
          : [],
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
        label: "Número de Cancelamentos",
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
            return `${contexto.parsed.y} procedimentos cancelados`;
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
        {/* Filtro de Data */}
        <div className="header-com-filtro">
          <h1 className="dashboard-title-main">Cancelamentos</h1>
          <button 
            className="btn-toggle-filtro" 
            onClick={() => setMostrarFiltro(!mostrarFiltro)}
            title={mostrarFiltro ? "Fechar filtro" : "Abrir filtro"}
          >
            <i className={`fas fa-filter ${mostrarFiltro ? 'ativo' : ''}`}></i>
          </button>
        </div>

        {mostrarFiltro && (
          <div className="filtro-container">
            <div className="filtro-datas">
              <div className="filtro-campo">
                <label htmlFor="dataInicio">
                  <i className="fas fa-calendar-alt"></i> Data Início
                </label>
                <input 
                  type="date" 
                  id="dataInicio"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                  max={dataFim || undefined}
                />
              </div>
              
              <div className="filtro-campo">
                <label htmlFor="dataFim">
                  <i className="fas fa-calendar-alt"></i> Data Fim
                </label>
                <input 
                  type="date" 
                  id="dataFim"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                  min={dataInicio || undefined}
                />
              </div>
              
              <div className="filtro-acoes">
                <button className="btn-filtrar" onClick={handleFiltrar}>Filtrar</button>
                <button className="btn-limpar" onClick={handleLimparFiltro}>Limpar</button>
              </div>
            </div>
            
            <p className="periodo-selecionado">
              {dataInicio && dataFim 
                ? `Período: ${new Date(dataInicio + 'T00:00:00').toLocaleDateString('pt-BR')} - ${new Date(dataFim + 'T00:00:00').toLocaleDateString('pt-BR')}`
                : 'Selecione um período para filtrar'
              }
            </p>
          </div>
        )}
        
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
            <h3 className="chart-title">Cancelamentos Por Dia <HelpModal local="Informações do gráfico" explicacao="O gráfico exibe os dias da semana em que cada procedimento tem mais demanda para que você possa prever sua agenda." /></h3>
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