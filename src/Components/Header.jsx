import "../Pages/Styles/Header.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export function Header(props) {
    const navigate = useNavigate();
    const [popupVisivel, setPopupVisivel] = useState(false);

    const exibirPopUp = () => {
      setPopupVisivel(true);
    };
  
    const fecharPopUp = () => {
      setPopupVisivel(false);
    };

    const handleLogout = () => {
      localStorage.removeItem("token")
      localStorage.removeItem("idUsuario")
      localStorage.removeItem("nome")
      localStorage.removeItem("email")
      localStorage.removeItem("role")
      localStorage.removeItem("cargo")
      console.log(localStorage)
      navigate("/Login");
    }

    const handleMenu = () => {
      if(localStorage.getItem("cargo") === "Cliente"){
        navigate("/MenuCliente");
      }
      else{
        navigate("/Menu");
      }
    }

    return(
        <div className="header">
            <div onClick={(e) => {
              e.stopPropagation(); 
              if (props.exibirPopup) {
                exibirPopUp();
              } else if (props.customAction) {
                props.customAction();
              } else {
                handleMenu();
              }
              }} 
              style={{ backgroundColor: props.cor, justifyContent: props.alinhamento, padding: props.padding, color: props.color }} className="navbarMenu">
                {props.icone}
                <p className="textoUsuario">{props.texto}</p>
            </div>

            {props.exibirPopup && popupVisivel && (
              <>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  fecharPopUp();
                }}
                className="background-popup"
                id="background-popup"
              ></div>

              <div
                className="popup"
                id="popup"
                onClick={(e) => e.stopPropagation()}
              >
                <h4>
                  Atenção!
                </h4>
                <span>Você está sendo redirecionado para a página de login.</span>
                <span className="align-center">
                  Tem certeza que deseja sair?
                </span>
                <div className="botoes-popup">
                  <button onClick={handleLogout} className="sair">Sair</button>
                  <button onClick={fecharPopUp}>Cancelar</button>
                </div>
              </div>
            </>
            )}
        </div>
    )
}