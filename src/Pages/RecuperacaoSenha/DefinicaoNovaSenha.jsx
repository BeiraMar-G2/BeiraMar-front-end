import React, { useState } from 'react';
import { Input } from '../../Components/Input';
import { FaKey, FaUser } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigation } from "../../Hooks/useNavigation";
import { Botao } from '../../Components/Botao';
import { Titulo, Label } from '../../Components/Fontes';
import { Erro } from '../../Components/Modal';
import api from '../../Provider/api';

export function DefinicaoNovaSenha() {
    const { handleNavigate } = useNavigation();

    const [senhaNova, setSenhaNova] = useState('');
    const [confSenhaNova, setConfSenhaNova] = useState('');
    const [senhaAtual, setSenhaAtual] = useState('');
    const [email, setEmail] = useState(location.state?.email || 'fernanda@gmail.com');
    const [idUsuario, setIdUsuario] = useState("");
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");

    async function atualizarSenha() {
        if (senhaNova !== confSenhaNova) {
            alert('A senha deve ser a mesma nos campos!');
            return;
        } else {
            console.log('Senhas:', senhaAtual, senhaNova, confSenhaNova);
            try {
                const response = await api.get(`/clientes/buscarPorEmail/${email}`);
                setIdUsuario(response.data.idUsuario);
                setNome(response.data.nome);
                setTelefone(response.data.telefone);
                console.log(response.data);
            } catch (error) {
                console.error("Erro ao encontrar usuário por email:", error);
            }
            await api.put(`/clientes/${idUsuario}`, {
                nome: nome,
                telefone: telefone,
                email: email,
            })
            .then((response) => {
                console.log("Dados atualizados com sucesso:", response.data);
            })
            .catch((error) => {
                console.error("Erro ao atualizar dados do usuário:", error);
            });
        }
        }
        
        

    return (
        <div className="content cliente">
            <div onClick={() => handleNavigate("/RecuperacaoCodigo")} className='voltar-wrapper'>
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