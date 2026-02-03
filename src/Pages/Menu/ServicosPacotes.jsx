import "../Styles/Botao.css"
import "../Styles/Header.css"
import { BotaoMenu } from "../../Components/Botao"
import { Header } from "../../Components/Header"
import { IoBagAddSharp } from "react-icons/io5";
import { useNavigation } from "../../Hooks/useNavigation";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { BiSolidShoppingBags } from "react-icons/bi";
import { Botao } from "../../Components/Botao";

export function ServicosPacotes() {
  const { handleNavigate } = useNavigation();
  return (
    <div className="containerMenu">
      <Header exibirPopup={true} texto={`Olá, ${sessionStorage.getItem('nome')}!`} alinhamento="center" icone={<RiLogoutBoxLine size={28}/>} color="#282828"/>
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
        <BotaoMenu texto="Criar Serviço" imagem={<IoBagAddSharp className="icone-menu"/>} onClick={() => handleNavigate("/Servico/Cadastro")}/>
        <BotaoMenu texto="Criar Pacote" imagem={<MdOutlineAddShoppingCart className="icone-menu"/>} onClick={() => handleNavigate("/Pacote/Cadastro")}/>
      </div>
      <div className="botoesMenu">
        <BotaoMenu texto="Serviços e Pacotes" imagem={<BiSolidShoppingBags className="icone-menu"/>} onClick={() => handleNavigate("/Pacotes")}/>
      </div>

      <div className="botoes-acao">
        <Botao texto="Voltar" cor="#C8C5C5" onClick={() => handleNavigate("/Menu")} />
      </div>
    
    </div>
  )
}
