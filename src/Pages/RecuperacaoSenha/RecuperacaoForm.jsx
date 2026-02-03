import { Botao } from '../../Components/Botao.jsx'
import { Input } from '../../Components/Input.jsx'
import { Titulo } from '../../Components/Fontes.jsx'
import { IoIosMail } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigation } from "../../Hooks/useNavigation";
import '../Styles/Form.css'
import '../Styles/Input.css'
import '../Styles/Fontes.css'
import '../Styles/Botao.css'
import { useState } from 'react';
import api from '../../Provider/api';

export function RecuperacaoForm(){
  const { handleNavigate } = useNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const enviarCodigoRecuperacao = async () => {
    if (!email.trim()) {
      setMensagem('Por favor, digite seu email');
      return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setMensagem('Por favor, digite um email válido');
      return;
    }

    setLoading(true);
    setMensagem('');

    try {
      console.log('Enviando requisição para:', '/recuperacao/enviar-codigo');
      console.log('Dados enviados:', { email: email });

      const response = await api.post('/recuperacao/enviar-codigo', {
        email: email
      });

      console.log('Código enviado com sucesso:', response.data);
      setMensagem('Código de recuperação enviado para seu email!');
      
      // Redirecionar para a página de inserir código após alguns segundos
      setTimeout(() => {
        handleNavigate('/RecuperacaoCodigo', { 
          state: { email: email } // Passa o email para a próxima página
        });
      }, 2000);

    } catch (error) {
      console.error('Erro completo:', error);
      console.error('Status:', error.response?.status);
      console.error('Dados do erro:', error.response?.data);
      console.error('Headers:', error.response?.headers);
      
      if (error.response?.status === 500) {
        setMensagem('Erro interno do servidor. Tente novamente em alguns minutos.');
      } else if (error.response?.status === 404) {
        setMensagem('Email não encontrado');
      } else if (error.response?.status === 400) {
        setMensagem('Dados inválidos. Verifique o email digitado.');
      } else if (error.response?.data?.message) {
        setMensagem(error.response.data.message);
      } else if (error.message.includes('Network Error')) {
        setMensagem('Erro de conexão. Verifique sua internet.');
      } else {
        setMensagem('Erro ao enviar código. Tente novamente');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className='content atendente'>
    <div onClick={() => handleNavigate(-1)} className='voltar-wrapper'>
      <FaArrowLeft size={28} color="#000" className='voltar'/>
    </div>
      <div className='formulariocentrado'>
          <Titulo texto="Recuperação de Senha"/>

          <div className='conjuntoInput'>
            <Input 
              type="email" 
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => {
                if (e && e.target) {
                  setEmail(e.target.value);
                } else {
                  // Se o Input personalizado passa o valor diretamente
                  setEmail(e || '');
                }
              }}
              disabled={loading}
            />
            <IoIosMail className='icon' size={30}/>
          </div>

          {mensagem && (
            <div className={`mensagem ${mensagem.includes('sucesso') || mensagem.includes('enviado') ? 'sucesso' : 'erro'}`}>
              {mensagem}
            </div>
          )}

          <Botao 
            cor="#F8C7CC" 
            texto={loading ? "Enviando..." : "Enviar"}
            onClick={enviarCodigoRecuperacao}
            disabled={loading}
          />
      </div>
  </div>
)}
