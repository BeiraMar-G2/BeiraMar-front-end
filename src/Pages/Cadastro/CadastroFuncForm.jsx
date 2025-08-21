import { Botao } from '../../Components/Botao.jsx'
import { Input } from '../../Components/Input.jsx'
import { Titulo } from '../../Components/Fontes.jsx'
import { IoIosMail } from "react-icons/io";
import { FaKey, FaPhone, FaUser } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import api from '../../Provider/api.js';
import '../Styles/Form.css'
import '../Styles/Input.css'
import '../Styles/Fontes.css'
import '../Styles/Botao.css'

export function CadastroFuncForm(){

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const navigate = useNavigate();

    function cadastrarUsuario() {
    console.log("Cadastrando funcionário:", {
      nome,
      telefone,
      email,
      senha
    });
    api.post("/clientes", {
      nome: nome,
      email: email,
      telefone: telefone,
      senha: senha,
      dtNasc: "2003-08-19", 
      fkCargo: 3
    })
    .then((response)=>console.log(response.status))
  }
  
    return (
    <div className='content atendente'>
    <div onClick={() => navigate("/Menu")} className='voltar-wrapper'>
      <FaArrowLeft size={28} color="#000" className='voltar'/>
    </div>
      <div className='formulariocentrado'>
        <div>
          <Titulo texto="Cadastrar Funcionária"/>
        </div>
        <div className='inputs'>
        <div className='conjuntoInput'>
          <Input valor="nome" type="text" placeholder="Digite seu nome" onChange={setNome}/>
          <FaUser className='icon' size={24} />
        </div>
        <div className='conjuntoInput'>
          <Input telefone='true' valor="telefone" type="text" placeholder="Digite seu telefone" onChange={setTelefone}/>
          <FaPhone className='icon' size={24} />
        </div>
        <div className='conjuntoInput'>
          <Input valor="email" type="text" placeholder="Digite seu email" onChange={setEmail}/>
          <IoIosMail className='icon' size={30} />
        </div>
        <div className='conjuntoInput'>
          <Input valor="senha" type="password" placeholder="Digite sua senha" onChange={setSenha}/>
          <FaKey className='icon' size={24} />
        </div>
        <div className='conjuntoInput'>
          <Input valor="confirmarSenha" icon="FaKey" type="password" placeholder="Confirme sua senha"/>
          <FaKey className='icon' size={24}/>
        </div>
        </div>
        <div onClick={cadastrarUsuario}>
          <Botao cor="#f8c7ccbb" texto="Cadastrar"/>
        </div>
      </div>
    </div>
  )
}


