import "../Styles/Botao.css"
import "../Styles/Menu.css"

import { BotaoMenu } from "../../Components/Botao"

export function Menu(){
  return (
    <div className="containerMenu">
        <div className="navbarMenu">
        </div>
        <b className="tituloMenu">Boas Vindas ao Menu!</b>
        <div className="botoesMenu1">
            <BotaoMenu texto="Agendamentos" />
            <BotaoMenu texto="Histórico de Agendamentos" />
        </div>
        <div className="botoesMenu1">
            <BotaoMenu texto="Serviços e Pacotes" />
            <BotaoMenu texto="Cadastro de Atendentes" />
        </div>
        <div className="botoesMenu1">
            <BotaoMenu texto="Disponibilidade" />
            <BotaoMenu texto="Dashboards" />
        </div>

    </div>
  )
}
