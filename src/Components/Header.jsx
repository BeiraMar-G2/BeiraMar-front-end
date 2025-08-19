import "../Pages/Styles/Header.css"
import { useNavigate } from "react-router-dom"

export function Header(props) {
    const navigate = useNavigate();

    const handleLogout = () => {
      navigate("/Menu"); 
    };

    return(
        <div onClick={handleLogout} className="header">
            <div style={{ justifyContent: props.alinhamento, padding: props.padding }} className="navbarMenu">
                {props.icone}
                <span className="textoUsuario">{props.texto}</span>
            </div>
        </div>
    )
}