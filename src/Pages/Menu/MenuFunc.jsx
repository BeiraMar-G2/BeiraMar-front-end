// Menu.jsx
import "../Styles/Botao.css"
import "../Styles/Menu.css"
import { BotaoMenu } from "../../Components/Botao"

export function Menu() {
  return (
    <div className="containerMenu">
       <div className="navbarMenu">
        <span className="iconeUsuario">👤</span>
        <span className="textoUsuario">Olá, Ana!</span>
      </div>
      <b className="tituloMenu">Boas Vindas ao Menu!</b>

      <div className="botoesMenu1">
        <BotaoMenu texto="Agendamentos" imagem="/Assets/calendario.png"/>
        <BotaoMenu texto="Histórico de Agendamentos" imagem="/Assets/historico.png"/>
      </div>
      <div className="botoesMenu1">
        <BotaoMenu texto="Serviços e Pacotes" imagem="/Assets/servicos.png"/>
        <BotaoMenu texto="Cadastro de Atendentes" imagem="/Assets/cadastro.png"/>
      </div>
      <div className="botoesMenu1">
        <BotaoMenu texto="Disponibilidade" imagem="/Assets/disponibilidade.png"/>
        <BotaoMenu texto="Dashboards" imagem="/Assets/dashboards.png"/>
      </div>
    </div>
  )
}
