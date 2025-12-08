import React, { useEffect, useState } from 'react';
import { Header } from '../../Components/Header';
import { Botao } from '../../Components/Botao';
import { useNavigate } from 'react-router-dom';
import '../Styles/DashboardMenu.css';
import api from '../../Provider/api';
import { HelpModal } from '../../Components/Modal';

export function DashboardMenu() {
  const [procedimentosRealizados, setProcedimentosRealizados] = useState(0);
  const [procedimentosCancelados, setProcedimentosCancelados] = useState(0);
  const [rankingProcedimentos, setRankingProcedimentos] = useState([]);
  
  // Estados para o filtro de data
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [mostrarFiltro, setMostrarFiltro] = useState(false);

  function buscarProcedimentos(inicio = null, fim = null) {
    let dataInicioFormatada, dataFimFormatada;
    
    if (inicio && fim) {
      // Formatar datas com horário (fim do dia para dataFim)
      dataInicioFormatada = `${inicio}T00:00:00`;
      dataFimFormatada = `${fim}T23:59:59`;
    } else {
      // Calcular últimos 30 dias
      const hoje = new Date();
      dataFimFormatada = hoje.toISOString().split('T')[0] + 'T23:59:59';
      const trinta_dias_atras = new Date(hoje.getTime() - 30 * 24 * 60 * 60 * 1000);
      dataInicioFormatada = trinta_dias_atras.toISOString().split('T')[0] + 'T00:00:00';
    }

    const params = new URLSearchParams({
      inicio: dataInicioFormatada,
      fim: dataFimFormatada
    });

    api.get(`/agendamentos/contarCancelados?${params}`)
      .then(response => {
        setProcedimentosCancelados(response.data);
        console.log("Procedimentos cancelados:", response, params.toString());
      })
      .catch(error => {
      });

    api.get(`/agendamentos/contarConcluidos?${params}`)
      .then(response => {
        setProcedimentosRealizados(response.data);
        console.log("Procedimentos realizados:", response, params.toString());
      })
      .catch(error => {
        // Erro ao buscar procedimentos realizados
      });
  }

  function buscarRanking(inicio = null, fim = null) {
    let dataInicioFormatada, dataFimFormatada;
    
    if (inicio && fim) {
      // Formatar datas com horário (fim do dia para dataFim)
      dataInicioFormatada = `${inicio}T00:00:00`;
      dataFimFormatada = `${fim}T23:59:59`;
    } else {
      // Calcular últimos 7 dias
      const hoje = new Date();
      dataFimFormatada = hoje.toISOString().split('T')[0] + 'T23:59:59';
      const sete_dias_atras = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000);
      dataInicioFormatada = sete_dias_atras.toISOString().split('T')[0] + 'T00:00:00';
    }

    const params = new URLSearchParams({
      dataInicio: dataInicioFormatada,
      dataFim: dataFimFormatada
    });

    api.get(`/servicos/top3-mais-agendados?${params}`)
      .then(response => {
        console.log("Ranking de procedimentos:", response.data, params.toString());
        if (Array.isArray(response.data)) {
          setRankingProcedimentos(response.data);
        } else {
          setRankingProcedimentos([]);
        }
      })
      .catch(error => {
        setRankingProcedimentos([]);
      });
  }

  const handleFiltrar = () => {
    if (dataInicio && dataFim) {
      buscarProcedimentos(dataInicio, dataFim);
      buscarRanking(dataInicio, dataFim);
    } else {
      alert('Por favor, selecione ambas as datas');
    }
  };

  const handleLimparFiltro = () => {
    setDataInicio('');
    setDataFim('');
    buscarProcedimentos();
    buscarRanking();
  };

  useEffect(() => {
    buscarProcedimentos();
    buscarRanking();
  }, []);


  const navigate = useNavigate();

  const handleDetalhes = (tipo) => {
    if (tipo === 'realizados') {
      navigate('/Dashboard/Realizado', {state: { rankingProcedimentos }});
    } else if (tipo === 'cancelados') {
      navigate('/Dashboard/Cancelamento');
    }
  };

  return (
    <div className="dashboard-menu">
      <div className="dashboard-header">
        <Header 
          icone={<i className="fas fa-home"></i>}
          texto="Menu"
          cor="#90FCF9"
          alinhamento="flex-start"
          padding="0 20px"
        />
      </div>
      
      <div className="dashboard-content">
        <div className="header-com-filtro">
          <h1 className="dashboard-title">Detalhamento dos Procedimentos</h1>
          <button 
            className="btn-toggle-filtro" 
            onClick={() => setMostrarFiltro(!mostrarFiltro)}
            title={mostrarFiltro ? "Fechar filtro" : "Abrir filtro"}
          >
            <i className={`fas fa-filter ${mostrarFiltro ? 'ativo' : ''}`}></i>
          </button>
        </div>
        
        {/* Filtro de Data - Aparece apenas quando mostrarFiltro for true */}
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
                <Botao 
                  texto="Filtrar" 
                  cor="#90FCF9" 
                  onClick={handleFiltrar}
                />
                <Botao 
                  texto="Limpar" 
                  cor="#f8c7cc" 
                  onClick={handleLimparFiltro}
                />
              </div>
            </div>
          </div>
        )}

        <div className="cards-container">
          <div className="card cancelados">
            <div className="card-header">
              <div className="card-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h3>Procedimentos Cancelados</h3>
            </div>
            <div className="card-content">
              <div className="card-number">{procedimentosCancelados}</div>
              <Botao 
                texto="Detalhes" 
                cor="#90FCF9" 
                onClick={() => handleDetalhes('cancelados')}
              />
            </div>
          </div>

          <div className="card realizados">
            <div className="card-header">
              <div className="card-icon">
                <i className="fas fa-check"></i>
              </div>
              <h3>Procedimentos Realizados</h3>
            </div>
            <div className="card-content">
              <div className="card-number">{procedimentosRealizados}</div>
              <Botao 
                texto="Detalhes" 
                cor="#90FCF9" 
                onClick={() => handleDetalhes('realizados')}
              />
            </div>
          </div>
        </div>

        <div className="favoritos-section">
          <h2>Procedimentos Favoritos <HelpModal local="Ranking de procedimentos em queda" explicacao="Esses são os procedimentos que estão com maior demanda no momento e o público está adorando!" /></h2>
          <div className="favoritos-list">
            {Array.isArray(rankingProcedimentos) && rankingProcedimentos.length > 0 ? (
              rankingProcedimentos.map((item, index) => (
                <div key={index} className="favorito-item">
                  <span className="favorito-numero">{item[0]}°</span>
                  <span className="favorito-nome">{item[1]}</span>
                  <span className="favorito-count">{item[2]}</span>
                </div>
              ))
            ) : (
              <div className="loading">Carregando ranking...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}