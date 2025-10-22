import React, { useState } from 'react';
import { Input } from '../../Components/Input';
import { FaKey, FaUser } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { Botao } from '../../Components/Botao';
import { Titulo, Label } from '../../Components/Fontes';

export function DefinicaoNovaSenha() {
    const navigate = useNavigate();

    const [senhaNova, setSenhaNova] = useState('');
    const [confSenhaNova, setConfSenhaNova] = useState('');
    const [senhaAtual, setSenhaAtual] = useState('');

    function atualizarSenha() {
        if (senhaNova !== confSenhaNova) {
            alert('A senha deve ser a mesma nos campos!');
            return;
        }
        console.log('Senhas:', senhaAtual, senhaNova, confSenhaNova);
    }

    return (
        <div className="content cliente">
            <div onClick={() => navigate("/RecuperacaoCodigo")} className='voltar-wrapper'>
                <FaArrowLeft size={28} className='voltar'/>
              </div>
            <div className="formulariocentrado">
                <Titulo texto="Alteração de Senha"/>

                <Label texto="Digite a Nova Senha"/>
                <div className='conjuntoInput'>
                    <Input
                    type="password"
                    valor="senha"
                    placeholder="digite a nova senha"
                    onChange={setSenhaNova}
                    />
                    <FaKey className='icon' size={24} />
                </div>
                
                <Label texto="Confirme a Nova Senha"/>
                <div className='conjuntoInput'>
                    <Input
                    type="password"
                    valor="senha"
                    placeholder="confirme a nova senha"
                    onChange={setConfSenhaNova}
                    />
                    <FaKey className='icon' size={24} />
                </div>

                
                <Botao cor="#f8c7ccbb" texto="Salvar Alterações" onClick={atualizarSenha}/>
            </div>
        </div>
    );
}
