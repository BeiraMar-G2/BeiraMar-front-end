import "../Pages/Styles/Header.css"
import { useNavigate } from "react-router-dom"

export function Header(props) {
    const navigate = useNavigate();

    const handleLogout = () => {
      if (props.isCliente) {
        navigate("/MenuCliente");
      } else {
        navigate("/Menu");
      }
    };

    return(
        <div onClick={handleLogout} className="header">
            <div style={{ backgroundColor: props.cor, justifyContent: props.alinhamento, padding: props.padding, color: props.color }} className="navbarMenu">
                {props.icone}
                <p className="textoUsuario">{props.texto}</p>
            </div>
        </div>
    )
}