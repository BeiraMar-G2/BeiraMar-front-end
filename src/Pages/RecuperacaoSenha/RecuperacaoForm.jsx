import { Botao } from '../../Components/Botao.jsx'
import { Input } from '../../Components/Input.jsx'
import { Titulo } from '../../Components/Fontes.jsx'
import { IoIosMail } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import '../Styles/Form.css'
import '../Styles/Input.css'
import '../Styles/Fontes.css'
import '../Styles/Botao.css'
import { useState } from 'react';

export function RecuperacaoForm(){

  const navigate = useNavigate();
  const [email, setEmail] = useState('');


  return (
  <div className='content atendente'>
    <div onClick={() => navigate("/Login")} className='voltar-wrapper'>
      <FaArrowLeft size={28} color="#000" className='voltar'/>
    </div>
      <div className='formulariocentrado'>
          <Titulo texto="Recuperação de Senha"/>

          <div className='conjuntoInput'>
            <Input type="text" placeholder="Digite seu email"/>
            <IoIosMail className='icon' size={30}/>
          </div>
          <Botao texto="Enviar"/>
      </div>
  </div>
)}
