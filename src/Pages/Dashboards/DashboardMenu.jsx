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

  function buscarProcedimentos() {
    api.get('/agendamentos/contarCancelados?dias=30')
      .then(response => {
        console.log('Procedimentos encontrados:', response);
        setProcedimentosCancelados(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar procedimentos:', error);
      });

      api.get('/agendamentos/contarAgendados?dias=30')
      .then(response => {
        console.log('Procedimentos encontrados:', response);
        setProcedimentosRealizados(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar procedimentos:', error);
      });
  }

  function buscarRanking() {
    api.get('/servicos/top3-mais-agendados?dias=7')
      .then(response => {
        console.log('Ranking de procedimentos encontrados:', response);
        setRankingProcedimentos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar ranking de procedimentos:', error);
      });
  }

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
        <h1 className="dashboard-title">Detalhamento dos Procedimentos</h1>
        <p className="periodo-fixo">Período: Últimos 30 dias</p>

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
            {rankingProcedimentos.length > 0 ? (
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