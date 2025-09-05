import { Header } from '../../Components/Header';
import { BotaoMenu } from '../../Components/Botao';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaShoppingBag, FaCalendarAlt, FaUser } from 'react-icons/fa';
import '../Styles/MenuCliente.css';

export function MenuCliente() {
    const navigate = useNavigate();

    const handleProximosAgendamentos = () => {
        console.log('Navegando para Próximos Agendamentos');
        navigate('/Agendamentos/VisualizarConsultas');
    };
    
    const handleServicosEPacotes = () => {
        console.log('Navegando para Serviços e Pacotes');
        navigate('/PacotesCadastradosCliente');
    };
    
    const handleHistoricoAgendamentos = () => {
        navigate('/Agendamentos/HistoricoAgendCliente');
    };

    const handlePerfil = () => {
        console.log('Navegando para Perfil');
        navigate('/Perfil');
    };

    return (
        <div className="menu-cliente">
            <Header 
                texto={`Olá, ${localStorage.getItem('nome')}!`}
                cor="#CE2D4F"
                icone={<FaUser />}
                alinhamento="center"
                color="#f8f8f8"
            />
            
            <div className="container-menu">
                <div className="boas-vindas">
                    <h2>Boas vindas ao menu!</h2>
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
