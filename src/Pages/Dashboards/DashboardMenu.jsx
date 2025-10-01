import React, { useState } from 'react';
import { Header } from '../../Components/Header';
import { Botao } from '../../Components/Botao';
import { useNavigate } from 'react-router-dom';
import '../Styles/DashboardMenu.css';

export function DashboardMenu() {
  const navigate = useNavigate();

  const handleDetalhes = (tipo) => {
    if (tipo === 'realizados') {
      navigate('/Dashboard/Realizado');
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
              <div className="card-number">5</div>
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
              <div className="card-number">178</div>
              <Botao 
                texto="Detalhes" 
                cor="#90FCF9" 
                onClick={() => handleDetalhes('realizados')}
              />
            </div>
          </div>
        </div>

        <div className="favoritos-section">
          <h2>Procedimentos Favoritos</h2>
          <div className="favoritos-list">
            <div className="favorito-item">
              <span className="favorito-numero">1°</span>
              <span className="favorito-nome">Massagem Modeladora</span>
              <span className="favorito-count">50</span>
            </div>
            <div className="favorito-item">
              <span className="favorito-numero">2°</span>
              <span className="favorito-nome">Drenagem Linfática</span>
              <span className="favorito-count">37</span>
            </div>
            <div className="favorito-item">
              <span className="favorito-numero">3°</span>
              <span className="favorito-nome">Design de Sobrancelha</span>
              <span className="favorito-count">20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}