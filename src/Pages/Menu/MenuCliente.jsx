import { Header } from '../../Components/Header';
import { BotaoMenu } from '../../Components/Botao';
import { useNavigation } from "../../Hooks/useNavigation";
import { FaClock, FaShoppingBag, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { RiLogoutBoxLine } from "react-icons/ri";
import '../Styles/MenuCliente.css';

export function MenuCliente() {
    const { handleNavigate } = useNavigation();

    return (
        <div className="menu-cliente">
            <Header 
                texto={`Olá, ${sessionStorage.getItem('nome')}!`}
                cor="#CE2D4F"
                icone={<RiLogoutBoxLine size={28}/>}
                alinhamento="center"
                color="#f8f8f8"
                exibirPopup={true}
            />
            
            <div className="container-menu">
                <div className="boas-vindas">
                    <h2>Boas vindas ao menu!</h2>
                {sessionStorage.getItem('loginGoogle') === 'true' ? (
                    <p style={{ color: '#282828' }}>Clique aqui para adicionar seu telefone! <a onClick={() => handleNavigate('/Perfil')}>Adicionar telefone</a></p>
                ) : null}
                </div>


                <div className="botoes-menu">
                    <BotaoMenu
                        texto="Meus Agendamentos"
                        imagem={<FaClock className="icone-menu" />}
                        onClick={() => handleNavigate('/Agendamentos/VisualizarConsultas')}
                        funcao="Cliente"
                    />
                    
                    <BotaoMenu
                        texto="Agendar Sessão"
                        imagem={<FaShoppingBag className="icone-menu" />}
                        onClick={() => handleNavigate('/PacotesCliente')}
                        funcao="Cliente"
                    />
                    
                    <BotaoMenu
                        texto="Histórico de Agendamentos"
                        imagem={<FaCalendarAlt className="icone-menu" />}
                        onClick={() => handleNavigate('/Agendamentos/HistoricoAgendCliente')}
                        funcao="Cliente"
                    />
                    
                    <BotaoMenu
                        texto="Perfil"
                        imagem={<FaUser className="icone-menu" />}
                        onClick={() => handleNavigate('/Perfil')}
                        funcao="Cliente"
                    />
                </div>
            </div>
        </div>
    );
}
