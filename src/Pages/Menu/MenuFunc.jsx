import "../Styles/Botao.css"
import "../Styles/Header.css"
import { BotaoMenu } from "../../Components/Botao"
import { Header } from "../../Components/Header"
import { Titulo } from "../../Components/Fontes"
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaCalendarAlt, FaCalendarCheck, FaChartLine } from "react-icons/fa";
import { LuAlarmClock, LuUserPlus } from "react-icons/lu";
import { BiSolidShoppingBags } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

export function Menu() {
  const navigate = useNavigate();

    function deslogar() {
      navigate("/Login");
    }

    const direcionarAgendamentos = () => {
      navigate('/Agendamentos/VisualizarPorDia'); 
    };

    const direcionarHistAgendamentos = () => {
      navigate("/Agendamentos/HistoricoAgendAtend"); 
    };
    
    const direcionarServPacotes = () => {
      navigate("/Servicos&Pacotes"); 
    };
    
    const direcionarCadAtendente = () => {
      navigate("/Cadastro/Funcionario"); 
    };

    const direcionarDisponibilidade = () => {
      navigate("/Indisponibilidade"); 
    };

    const direcionarDashboards = () => {
      navigate("/Dashboard/Menu"); 
    };

  return (
    <div className="containerMenu">
      <Header exibirPopup={true} onClick={deslogar} texto={`Olá, ${sessionStorage.getItem('nome')}!`} alinhamento="center" icone={<RiLogoutBoxLine size={28}/>} color="#282828"/>
      <Titulo texto="Boas Vindas ao Menu!"/>

      <div className="botoesMenu">
        <BotaoMenu onClick={direcionarAgendamentos} texto="Agendamentos" imagem={<FaCalendarAlt className="icone-menu"/>}/>
        <BotaoMenu onClick={direcionarHistAgendamentos} texto="Histórico de Agendamentos" imagem={<FaCalendarCheck className="icone-menu"/>}/>
      </div>
      <div className="botoesMenu">
        <BotaoMenu onClick={direcionarDisponibilidade} texto="Disponibilidade" imagem={<LuAlarmClock className="icone-menu"/>}/>
        <BotaoMenu onClick={direcionarServPacotes} texto="Serviços e Pacotes" imagem={<BiSolidShoppingBags className="icone-menu"/>}/>
      </div>
      {sessionStorage.getItem('cargo')=="Administrador" ? <div className="botoesMenu">
        <BotaoMenu onClick={direcionarDashboards} texto="Dashboards" imagem={<FaChartLine className="icone-menu"/>}/> 
        <BotaoMenu onClick={direcionarCadAtendente} texto="Cadastro de Atendentes" imagem={<LuUserPlus className="icone-menu"/>}  />
      </div> : ""}
    </div>
  )
}
