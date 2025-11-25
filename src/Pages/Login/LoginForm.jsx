import { Botao } from '../../Components/Botao.jsx';
import { Input } from '../../Components/Input.jsx';
import { Titulo } from '../../Components/Fontes.jsx';
import { IoIosMail } from "react-icons/io";
import { FaKey } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Sucesso } from '../../Components/Modal.jsx';
import api from '../../Provider/api';
import '../Styles/Form.css';
import '../Styles/Input.css';
import '../Styles/Fontes.css';
import '../Styles/Botao.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  function validarLogin() {
    api.post("/autenticacoes/login", {
      email: email,
      senha: senha
    })
    .then((response) => {
      const { token, cargo, nome, email, id, telefone } = response.data.body;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("cargo", cargo);
      sessionStorage.setItem("nome", nome);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("idUsuario", id);
      sessionStorage.setItem("telefone", telefone);
        sessionStorage.setItem("loginGoogle", "false");
      setShowAlert(true);
      console.log("Login realizado com sucesso:", response);
      if (response.status == "200") {
        setTimeout(() => setShowAlert(false), 6000);
        setTimeout(() => {  
          if (cargo == "Cliente") {
            navigate("/MenuCliente");
          } else {
            navigate("/Menu");
          }
        }, 4000);
      }
    });
  }

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential); // Decodifica o token JWT
    console.log("Google User:", decoded);

    api.post("/autenticacoes/login-google", {
      email: decoded.email,
      nome: decoded.name,
      fkCargo: 6
    })
      .then((response) => {
        const { token, cargo, nome, email, id } = response.data;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("cargo", cargo);
        sessionStorage.setItem("nome", nome);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("idUsuario", id);
        sessionStorage.setItem("loginGoogle", "true");
        setShowAlert(true);
        console.log("Login com Google realizado com sucesso:", response);
        if (response.status === 200) {
          setTimeout(() => setShowAlert(false), 6000);
          setTimeout(() => {
            if (cargo === "Cliente") {
              navigate("/MenuCliente");
            } else {
              navigate("/Menu");
            }
          }, 4000);
        }
      })
      .catch((error) => {
        console.error("Erro ao autenticar com Google:", error);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
      });
  };

  const handleGoogleFailure = (error) => {
    console.error("Erro ao autenticar com Google:", error);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <div className='content atendente'>
      <Sucesso
        show={showAlert} 
        onClose={() => setShowAlert(false)}
        texto="Login realizado com sucesso, boas vindas!  Redirecionando..."
      />
      <div onClick={() => navigate("/")} className='voltar-wrapper'>
        <FaArrowLeft size={28} color="#000" className='voltar'/>
      </div>
      <div className='formulariocentrado'>
        <img src="../../Assets/Logo.png" alt="" />
        <div>
          <Titulo texto="Login"/>
        </div>
        <div className='google-login'>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        </div>
        <div className='inputs'>
          <div className='conjuntoInput'>
            <Input valor="email" type="text" placeholder="Digite seu email" onChange={setEmail}/>
            <IoIosMail className='icon' size={30}/>
          </div>
          <div onSubmit={validarLogin} className='conjuntoInput'>
            <Input valor="senha" type="password" placeholder="Digite sua senha" onChange={setSenha}/>
            <FaKey className="icon" size={24}/>
          </div>
        </div>
        <Link className='recuperacao-senha' to={"/RecuperacaoSenha"}>Esqueceu a senha?</Link>
        <Botao cor="#F8C7CC" texto="Entrar" onClick={validarLogin}/>
        <div className='wrapper-cadastro'>
          <span>Não possui cadastro? </span><Link className='link' to={"/Cadastro"}>Cadastre-se aqui</Link>
        </div>
      </div>
    </div>
  );
}
