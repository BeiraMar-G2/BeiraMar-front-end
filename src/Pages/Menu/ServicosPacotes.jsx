import "../Styles/Botao.css"
import "../Styles/Header.css"
import { BotaoMenu } from "../../Components/Botao"
import { Header } from "../../Components/Header"
import { Titulo } from "../../Components/Fontes"
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RiShoppingBag4Fill } from "react-icons/ri";

export function ServicosPacotes() {
  return (
    <div className="containerMenu">
      <Header texto="Olá, Ana!" alinhamento="center" icone={<FaUser size={28}/>}/>
      <h2 style={{
        textAlign: "center",
        marginTop: "-100px",
        marginBottom: "110px",
        fontWeight: "bold",
        color: "#000",
        fontSize: "20px"
      }}>
        Gerencie seus serviços!
      </h2>

      <div className="botoesMenu">
        <BotaoMenu texto="Criar Serviço" imagem={<RiShoppingBag4Fill size={24} />} />
        <BotaoMenu texto="Criar Pacote" imagem="/Assets/historico.png"/>
      </div>
      <div className="botoesMenu">
        <BotaoMenu texto="Serviços e Pacotes" imagem="/Assets/servicos.png"/>
       
      </div>
    
    </div>
  )
}
