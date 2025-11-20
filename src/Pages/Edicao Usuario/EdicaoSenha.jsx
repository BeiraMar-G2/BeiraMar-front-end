import React, { useState } from 'react';
import { Input } from '../../Components/Input';
import { FaKey, FaUser } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { Botao } from '../../Components/Botao';
import { Titulo, Label } from '../../Components/Fontes';
import '../Styles/Form.css';
import api from '../../Provider/api';

export function EdicaoSenha() {
    const navigate = useNavigate();

    const [senhaNova, setSenhaNova] = useState('');
    const [confSenhaNova, setConfSenhaNova] = useState('');
    const [senhaAtual, setSenhaAtual] = useState('');

    function atualizarSenha() {
        if (senhaNova !== confSenhaNova) {
            alert('As senhas novas não coincidem!');
            return;
        }
        console.log('Senhas:', senhaAtual, senhaNova, confSenhaNova);
        api.put(`/clientes/${sessionStorage.getItem('idUsuario')}/trocar-senha`, {
            senhaAtual: senhaAtual,
            novaSenha: senhaNova,
            confirmarNovaSenha: confSenhaNova
        })
        .then((response) => {
            console.log('Senha atualizada com sucesso:', response.data);
            alert('Senha atualizada com sucesso!');
            navigate('/Perfil');
        })
        .catch((error) => {
            console.error('Erro ao atualizar a senha:', error);
            alert('Erro ao atualizar a senha.');
        });
    }

    return (
        <div className="content cliente">
            <div onClick={() => navigate("/Perfil")} className='voltar-wrapper'>
                <FaArrowLeft size={28} color="#000" className='voltar'/>
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

                <Label texto="Confirme a Senha Atual"/>
                <div className='conjuntoInput'>
                    <Input
                    type="password"
                    valor="senha"
                    placeholder="confirme a senha atual"
                    onChange={setSenhaAtual}
                    />
                    <FaKey className='icon' size={24} />
                </div>
                <Botao cor="#f8c7ccbb" texto="Salvar Alterações" onClick={atualizarSenha}/>
            </div>
        </div>
    );
}
