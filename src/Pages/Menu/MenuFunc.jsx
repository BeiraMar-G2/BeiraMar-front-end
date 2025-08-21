// Menu.jsx
import "../Styles/Botao.css"
import "../Styles/Header.css"
import { BotaoMenu } from "../../Components/Botao"
import { Header } from "../../Components/Header"
import { Titulo } from "../../Components/Fontes"
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function Menu() {
  const navigate = useNavigate();

    const direcionarAgendamentos = () => {
      navigate("/Agendamentos"); 
    };

    const direcionarHistAgendamentos = () => {
      navigate("/HistoricoAgendamentos"); 
    };
    
    const direcionarServPacotes = () => {
      navigate("/ServicosPacotes"); 
    };
    
    const direcionarCadAtendente = () => {
      console.log("Clicou em Cadastro de Atendentes");
      navigate("/Cadastro/Funcionario"); 
    };

    const direcionarDisponibilidade = () => {
      navigate("/Disponibilidade"); 
    };

    const direcionarDashboards = () => {
      navigate("/Dashboards"); 
    };

  return (
    <div className="containerMenu">
      <Header texto="Olá, Ana!" alinhamento="center" icone={<FaUser size={28}/>}/>
      <Titulo texto="Boas Vindas ao Menu!"/>

      <div className="botoesMenu">
        <BotaoMenu onClick={direcionarAgendamentos} texto="Agendamentos" imagem="/Assets/calendario.png"/>
        <BotaoMenu onClick={direcionarHistAgendamentos} texto="Histórico de Agendamentos" imagem="/Assets/historico.png"/>
      </div>
      <div className="botoesMenu">
        <BotaoMenu onClick={direcionarServPacotes} texto="Serviços e Pacotes" imagem="/Assets/servicos.png"/>
        <BotaoMenu onClick={direcionarCadAtendente} texto="Cadastro de Atendentes" imagem="/Assets/cadastro.png"/>
      </div>
      <div className="botoesMenu">
        <BotaoMenu onClick={direcionarDisponibilidade} texto="Disponibilidade" imagem="/Assets/disponibilidade.png"/>
        <BotaoMenu onClick={direcionarDashboards} texto="Dashboards" imagem="/Assets/dashboards.png"/>
      </div>
    </div>
  )
}
