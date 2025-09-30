import { Header } from '../../Components/Header';
import { BotaoMenu } from '../../Components/Botao';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaShoppingBag, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { RiLogoutBoxLine } from "react-icons/ri";
import '../Styles/MenuCliente.css';
import { useEffect } from 'react';

export function MenuCliente() {
    const navigate = useNavigate();

    const handleProximosAgendamentos = () => {
        navigate('/Agendamentos/VisualizarConsultas');
    };
    
    const handleServicosEPacotes = () => {
        navigate('/PacotesCliente');
    };
    
    const handleHistoricoAgendamentos = () => {
        navigate('/Agendamentos/HistoricoAgendCliente');
    };

    const handlePerfil = () => {
        navigate('/Perfil');
    };

    return (
        <div className="menu-cliente">
            <Header 
                texto={`Olá, ${localStorage.getItem('nome')}!`}
                cor="#CE2D4F"
                icone={<RiLogoutBoxLine size={28}/>}
                alinhamento="center"
                color="#f8f8f8"
                exibirPopup={true}
            />
            
            <div className="container-menu">
                <div className="boas-vindas">
                    <h2>Boas vindas ao menu!</h2>
                {localStorage.getItem('loginGoogle') == 'true' ? (
                    <p style={{ color: '#282828' }}>Clique aqui para adicionar seu telefone! <a onClick={() => navigate('/Perfil')}>Adicionar telefone</a></p>
                ) : null}
                </div>


                <div className="botoes-menu">
                    <BotaoMenu
                        texto="Próximos Agendamentos"
                        imagem={<FaClock className="icone-menu" />}
                        onClick={handleProximosAgendamentos}
                        funcao="Cliente"
                    />
                    
                    <BotaoMenu
                        texto="Agendar Sessão"
                        imagem={<FaShoppingBag className="icone-menu" />}
                        onClick={handleServicosEPacotes}
                        funcao="Cliente"
                    />
                    
                    <BotaoMenu
                        texto="Histórico de Agendamentos"
                        imagem={<FaCalendarAlt className="icone-menu" />}
                        onClick={handleHistoricoAgendamentos}
                        funcao="Cliente"
                    />
                    
                    <BotaoMenu
                        texto="Perfil"
                        imagem={<FaUser className="icone-menu" />}
                        onClick={handlePerfil}
                        funcao="Cliente"
                    />
                </div>
            </div>
        </div>
    );
}
