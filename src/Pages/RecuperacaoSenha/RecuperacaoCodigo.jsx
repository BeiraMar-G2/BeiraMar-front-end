import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Botao } from '../../Components/Botao';
import { FaArrowLeft } from 'react-icons/fa';
import '../Styles/RecuperacaoCodigo.css';

export function RecuperacaoCodigo() {
    const navigate = useNavigate();
    const [codigo, setCodigo] = useState(['', '', '', '', '', '']);

    const handleVoltar = () => {
        navigate(-1);
    };

    const handleEntrar = () => {
        const codigoCompleto = codigo.join('');
        if (codigoCompleto.length === 6) {
            console.log('Código digitado:', codigoCompleto);
            // Lógica para validar o código
        } else {
            alert('Por favor, digite o código completo de 6 dígitos');
        }
    };

    const handleCodigoChange = (index, valor) => {
        if (valor.length <= 1 && /^[0-9]*$/.test(valor)) {
            const novoCodigo = [...codigo];
            novoCodigo[index] = valor;
            setCodigo(novoCodigo);

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
                        />
                    ))}
                </div>

                <div className="botao-entrar">
                    <Botao 
                        texto="Entrar"
                        cor="#F8C7CC"
                        onClick={handleEntrar}
                    />
                </div>
            </div>
        </div>
    );
}
