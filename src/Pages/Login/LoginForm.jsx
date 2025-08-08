import { Botao } from '../../Components/Botao.jsx'
import { Input } from '../../Components/Input.jsx'
import { Titulo } from '../../Components/Fontes.jsx'
import { IoIosMail } from "react-icons/io";
import { FaKey } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../Styles/Form.css'
import '../Styles/Input.css'
import '../Styles/Fontes.css'
import '../Styles/Botao.css'

export function LoginForm(){

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();


    return (
    <div className='content atendente'>
    <div onClick={() => navigate("/")} className='voltar-wrapper'>
      <FaArrowLeft size={28} color="#000" className='voltar'/>
    </div>
        <div className='formulariocentrado'>
            <img src="../../Assets/Logo.png" alt="" />
            <div>
              <Titulo texto="Login"/>
            </div>
            <div className='inputs'>
            <div className='conjuntoInput'>
              <Input valor="email" type="text" placeholder="Digite seu email"/>
              <IoIosMail className='icon' size={30}/>
            </div>
            <div className='conjuntoInput'>
              <Input valor="senha" type="password" placeholder="Digite sua senha"/>
              <FaKey className="icon" size={24}/>
            </div>
            </div>
            <Link className='recuperacao-senha' to={"/RecuperacaoSenha"}>Esqueceu a senha?</Link>
            <Botao texto="Entrar"/>
            <div className='wrapper-cadastro'>
                <span>Não possui cadastro? </span><Link className='link' to={"/Cadastro"}>Cadastre-se aqui</Link>
            </div>
        </div>
    </div>
  )
}
