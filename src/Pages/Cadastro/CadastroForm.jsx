import { Botao } from '../../Components/Botao.jsx'
import { Input } from '../../Components/Input.jsx'
import { Titulo } from '../../Components/Fontes.jsx'
import { IoIosMail } from "react-icons/io";
import { FaKey, FaPhone, FaUser } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../Styles/Form.css'
import '../Styles/Input.css'
import '../Styles/Fontes.css'
import '../Styles/Botao.css'

export function CadastroForm(){

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const navigate = useNavigate();

return (
  <div className='content atendente'>
  <div onClick={() => navigate("/")} className='voltar-wrapper'>
    <FaArrowLeft size={28} color="#000" className='voltar'/>
  </div>
    <div className='formulario'>
      <img src="../Assets/Logo.png" alt="" />
      <div>
        <Titulo texto="Cadastre-se"/>
      </div>
      <div className='inputs'>
      <div className='conjuntoInput'>
        <Input valor="nome" type="text" placeholder="Digite seu nome"/>
        <FaUser className='icon' size={24} />
      </div>
      <div className='conjuntoInput'>
        <Input telefone='true' valor="telefone" type="text" placeholder="Digite seu telefone"/>
        <FaPhone className='icon' size={24} />
      </div>
      <div className='conjuntoInput'>
        <Input valor="email" type="text" placeholder="Digite seu email"/>
        <IoIosMail className='icon' size={30} />
      </div>
      <div className='conjuntoInput'>
        <Input valor="senha" type="password" placeholder="Digite sua senha"/>
        <FaKey className='icon' size={24} />
      </div>
      <div className='conjuntoInput'>
        <Input valor="confirmarSenha" icon="FaKey" type="password" placeholder="Confirme sua senha"/>
        <FaKey className='icon' size={24}/>
      </div>
      </div>
      <Botao texto="Cadastrar"/>
      <div>
          <span>Já possui cadastro?</span> <Link className='link' to={"/Login"}>Faça o Login aqui</Link>
      </div>
    </div>
  </div>
)
}


