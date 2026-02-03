import "../Styles/Botao.css"
import "../Styles/Header.css"
import { BotaoMenu } from "../../Components/Botao"
import { Header } from "../../Components/Header"
import { Titulo } from "../../Components/Fontes"
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaCalendarAlt, FaCalendarCheck, FaChartLine } from "react-icons/fa";
import { LuAlarmClock, LuUserPlus } from "react-icons/lu";
import { BiSolidShoppingBags } from "react-icons/bi";
import { useNavigation } from "../../Hooks/useNavigation";

export function Menu() {
  const { handleNavigate } = useNavigation();

  return (
    <div className="containerMenu">
      <Header exibirPopup={true} onClick={() => handleNavigate("/Login")} texto={`Olá, ${sessionStorage.getItem('nome')}!`} alinhamento="center" icone={<RiLogoutBoxLine size={28}/>} color="#282828"/>
      <Titulo texto="Boas Vindas ao Menu!"/>

      <div className="botoesMenu">
        <BotaoMenu onClick={() => handleNavigate('/Agendamentos/VisualizarPorDia')} texto="Agendamentos" imagem={<FaCalendarAlt className="icone-menu"/>}/>
        <BotaoMenu onClick={() => handleNavigate("/Agendamentos/HistoricoAgendAtend")} texto="Histórico de Agendamentos" imagem={<FaCalendarCheck className="icone-menu"/>}/>
      </div>
      <div className="botoesMenu">
        <BotaoMenu onClick={() => handleNavigate("/Indisponibilidade")} texto="Disponibilidade" imagem={<LuAlarmClock className="icone-menu"/>}/>
        <BotaoMenu onClick={() => handleNavigate("/Servicos&Pacotes")} texto="Serviços e Pacotes" imagem={<BiSolidShoppingBags className="icone-menu"/>}/>
      </div>
      {sessionStorage.getItem('cargo')=="Administrador" ? <div className="botoesMenu">
        <BotaoMenu onClick={() => handleNavigate("/Dashboard/Menu")} texto="Dashboards" imagem={<FaChartLine className="icone-menu"/>}/> 
        <BotaoMenu onClick={() => handleNavigate("/Cadastro/Funcionario")} texto="Cadastro de Atendentes" imagem={<LuUserPlus className="icone-menu"/>}  />
      </div> : ""}
    </div>
  )
}
