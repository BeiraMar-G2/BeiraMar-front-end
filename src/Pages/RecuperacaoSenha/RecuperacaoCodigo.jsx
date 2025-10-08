import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Botao } from '../../Components/Botao';
import { FaArrowLeft } from 'react-icons/fa';
import api from '../../Provider/api';
import '../Styles/RecuperacaoCodigo.css';
import { useLocation } from 'react-router-dom';

export function RecuperacaoCodigo() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';
    const [codigo, setCodigo] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState('');

    const handleVoltar = () => {
        navigate(-1);
    };

    const handleEntrar = async () => {
        const codigoCompleto = codigo.join('');
        
        if (codigoCompleto.length !== 6) {
            setMensagem('Por favor, digite o código completo de 6 dígitos');
            return;
        }

        setLoading(true);
        setMensagem('');

        try {
            console.log('Enviando dados:', { codigo: codigoCompleto, email: email });
            
            const response = await api.post('/recuperacao/validar-codigo', {
                codigo: codigoCompleto,
                email: email  // Inclui o email se necessário
            });

            console.log('Código validado com sucesso:', response.data);
            setMensagem('Código validado com sucesso!');
            
            // Redirecionar para página de nova senha após validação
            setTimeout(() => {
                navigate('/recuperacao/nova-senha', { 
                    state: { 
                        codigo: codigoCompleto,
                        // Pode passar outros dados necessários do response
                        token: response.data.token || null
                    }
                });
            }, 1500);

        } catch (error) {
            console.error('Erro ao validar código:', error);
            
            if (error.response?.status === 400) {
                setMensagem('Código inválido ou expirado');
            } else if (error.response?.status === 404) {
                setMensagem('Código não encontrado');
            } else if (error.response?.data?.message) {
                setMensagem(error.response.data.message);
            } else {
                setMensagem('Erro ao validar código. Tente novamente');
            }
            
            // Limpar campos em caso de erro
            setCodigo(['', '', '', '', '', '']);
            const firstInput = document.getElementById('codigo-0');
            if (firstInput) firstInput.focus();
        } finally {
            setLoading(false);
        }
    };

    const handleCodigoChange = (index, valor) => {
        if (valor.length <= 1 && /^[0-9]*$/.test(valor)) {
            const novoCodigo = [...codigo];
            novoCodigo[index] = valor;
            setCodigo(novoCodigo);

            // Limpar mensagem quando usuário começar a digitar
            if (mensagem) setMensagem('');

            // Foco automático no próximo campo
            if (valor && index < 5) {
                const nextInput = document.getElementById(`codigo-${index + 1}`);
                if (nextInput) nextInput.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !codigo[index] && index > 0) {
            const prevInput = document.getElementById(`codigo-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    return (
        <div className="content atendente">
            <div onClick={() => navigate("/Login")} className='voltar-wrapper'>
                <FaArrowLeft size={28} color="#000" className='voltar'/>
            </div>

            <div className="formulariocentrado">
                <div className="titulo-recuperacao">
                    <h2>Recuperação de Senha</h2>
                </div>

                <div className="campos-codigo">
                    {codigo.map((digito, index) => (
                        <input
                            key={index}
                            id={`codigo-${index}`}
                            type="text"
                            className="campo-codigo"
                            value={digito}
                            onChange={(e) => handleCodigoChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            maxLength="1"
                            disabled={loading}
                        />
                    ))}
                </div>

                {mensagem && (
                    <div className={`mensagem ${mensagem.includes('sucesso') ? 'sucesso' : 'erro'}`}>
                        {mensagem}
                    </div>
                )}

                <div className="botao-entrar">
                    <Botao 
                        texto={loading ? "Validando..." : "Entrar"}
                        cor="#F8C7CC"
                        onClick={handleEntrar}
                        disabled={loading}
                    />
                </div>
            </div>
        </div>
    );
}
