import "../Styles/Botao.css"
import "../Styles/Header.css"
import { BotaoMenu } from "../../Components/Botao"
import { Header } from "../../Components/Header"

import { IoBagAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { BiSolidShoppingBags } from "react-icons/bi";
import { Botao } from "../../Components/Botao";

export function ServicosPacotes() {
  const navigate = useNavigate();
  return (
    <div className="containerMenu">
      <Header texto={`Olá, ${localStorage.getItem('nome')}!`} alinhamento="center" icone={<RiLogoutBoxLine size={28}/>} color="#282828"/>
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
        <BotaoMenu texto="Criar Serviço" imagem={<IoBagAddSharp className="icone-menu"/>} onClick={() => {navigate("/Servico/Cadastro")}}/>
        <BotaoMenu texto="Criar Pacote" imagem={<MdOutlineAddShoppingCart className="icone-menu"/>} onClick={() => {navigate("/Pacote/Cadastro")}}/>
      </div>
      <div className="botoesMenu">
        <BotaoMenu texto="Serviços e Pacotes" imagem={<BiSolidShoppingBags className="icone-menu"/>} onClick={() => {navigate("/Pacotes")}}/>
      </div>

      <div className="botoes-acao">
        <Botao texto="Voltar" cor="#C8C5C5" onClick={() => navigate("/Menu")} />
      </div>
    
    </div>
  )
}
