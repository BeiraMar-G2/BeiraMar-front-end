import { Header } from '../../Components/Header';
import { BotaoMenu } from '../../Components/Botao';
import { useNavigate } from 'react-router-dom';
import { FaClock, FaShoppingBag, FaCalendarAlt, FaUser } from 'react-icons/fa';
import '../Styles/MenuCliente.css';

export function MenuCliente() {
    const navigate = useNavigate();

    const handleProximosAgendamentos = () => {
        console.log('Navegando para Próximos Agendamentos');
        // navigate('/--------');
    };

    const handleServicosEPacotes = () => {
        console.log('Navegando para Serviços e Pacotes');
       // navigate('/--------');
    };

    const handleHistoricoAgendamentos = () => {
        console.log('Navegando para Histórico de Agendamentos');
        // navigate('/HistoricoAgendamentos');
    };

    const handlePerfil = () => {
        console.log('Navegando para Perfil');
        // navigate('/perfil');
    };

    return (
        <div className="menu-cliente">
            <Header 
                texto="Olá, Roberta!"
                cor="#CE2D4F"
                icone={<FaUser />}
                alinhamento="center"
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
                    />
                    
                    <BotaoMenu
                        texto="Serviços e Pacotes"
                        imagem={<FaShoppingBag className="icone-menu" />}
                        onClick={handleServicosEPacotes}
                    />
                    
                    <BotaoMenu
                        texto="Histórico de Agendamentos"
                        imagem={<FaCalendarAlt className="icone-menu" />}
                        onClick={handleHistoricoAgendamentos}
                    />
                    
                    <BotaoMenu
                        texto="Perfil"
                        imagem={<FaUser className="icone-menu" />}
                        onClick={handlePerfil}
                    />
                </div>
            </div>
        </div>
    );
}
