import { Botao } from '../../Components/Botao.jsx'
import { Input } from '../../Components/Input.jsx'
import { Label } from '../../Components/Fontes.jsx'
import { IoIosBrush, IoIosMail } from "react-icons/io";
import { FaPhone, FaUser } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../Styles/Form.css'
import '../Styles/Input.css'
import '../Styles/Fontes.css'
import '../Styles/Botao.css'

export function EdicaoUsuarioForm(){

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const usuario = {
    nome: localStorage.getItem('nome'),
    telefone: localStorage.getItem('telefone'),
    email: localStorage.getItem('email')
  }

return (
  <div className='content cliente'>
  <div onClick={() => navigate("/MenuCliente")} className='voltar-wrapper'>
    <FaArrowLeft size={28} color="#000" className='voltar'/>
  </div>
    <div className='formulario'>
      <div>
      </div>
      <div className='inputs'>
        <Label texto="Foto de Perfil"/>
      <div className='fotoPerfil'>
        <IoIosBrush className='icon' size={30}/>
      </div>
        <Label texto="Nome"/>
      <div className='conjuntoInput'>
        <Input valor="nome" type="text" placeholder={usuario.nome == null ? "Insira seu nome" : usuario.nome}/>
        <FaUser className='icon' size={24} />
      </div>
        <Label texto="Telefone"/>
      <div className='conjuntoInput'>
        <Input telefone='true' valor="telefone" type="text" placeholder={usuario.telefone == null ? "Insira seu telefone" : usuario.telefone}/>
        <FaPhone className='icon' size={24} />
      </div>
        <Label texto="Email"/>
      <div className='conjuntoInput'>
        <Input valor="email" type="text" placeholder={usuario.email == null ? "Insira seu email" : usuario.email}/>
        <IoIosMail className='icon' size={30} />
      </div>
      </div>
      <Botao texto="Salvar" cor="#f8c7ccbb"/>
      <div className='alterarSenha'>
      <Botao texto="Alterar Senha" cor="#f8c7ccbb" onClick={() => {
        navigate("/Perfil/Senha");
      }}/> 
      <FaArrowRight size={18} color="#282828" />
      </div>
    </div>
  </div>
)
}


