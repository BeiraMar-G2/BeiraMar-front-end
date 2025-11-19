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
    // Monta a query string com as datas se fornecidas
    let queryParams = '';
    if (inicio && fim) {
      queryParams = `?dataInicio=${inicio}&dataFim=${fim}`;
    } else {
      queryParams = '?dias=30';
    }

    api.get(`/agendamentos/contarCancelados${queryParams}`)
      .then(response => {
        console.log('Procedimentos cancelados:', response);
        setProcedimentosCancelados(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar procedimentos cancelados:', error);
      });

      api.get(`/agendamentos/contarAgendados${queryParams}`)
      .then(response => {
        console.log('Procedimentos realizados:', response);
        setProcedimentosRealizados(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar procedimentos realizados:', error);
      });
  }

  function buscarRanking(inicio = null, fim = null) {
    let queryParams = '';
    if (inicio && fim) {
      queryParams = `?dataInicio=${inicio}&dataFim=${fim}`;
    } else {
      queryParams = '?dias=7';
    }

    api.get(`/servicos/top3-mais-agendados${queryParams}`)
      .then(response => {
        console.log('Ranking de procedimentos encontrados:', response);
        console.log('Tipo de dado:', typeof response.data);
        console.log('É array?', Array.isArray(response.data));
        
        if (Array.isArray(response.data)) {
          setRankingProcedimentos(response.data);
        } else {
          console.error('Dados recebidos não são um array:', response.data);
          setRankingProcedimentos([]);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar ranking de procedimentos:', error);
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