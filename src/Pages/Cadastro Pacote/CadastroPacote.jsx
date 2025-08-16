import React, { useState } from 'react';
import { Botao } from '../../Components/Botao.jsx';
import { Input } from '../../Components/Input.jsx';
import { Titulo, Label } from '../../Components/Fontes.jsx';
import { FaHome } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import '../Styles/CadastroPacote.css';

export function CadastroPacote() {
    const [formData, setFormData] = useState({
        nomePacote: '',
        sobrancelha: true,
        massagem: false,
        drenagem: true,
        limpeza: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCardClick = (servico) => {
        setFormData(prev => ({ ...prev, [servico]: !prev[servico] }));
    };

    const servicos = [
        { id: 'sobrancelha', label: 'Design de Sobrancelha' },
        { id: 'massagem', label: 'Massagem Modeladora' },
        { id: 'drenagem', label: 'Drenagem' },
        { id: 'limpeza', label: 'Limpeza de Pele' },
    ];

    return (
        <div className="content pacote">
            {/* Navbar */}
            <div className="navbar">
                <FaHome size={20} color="#000" />
                <span className="navbar-text">Menu</span>
            </div>

            <div className="formulario">
                <Titulo texto="Cadastro de Pacotes" />
                <Label texto="Serviços do Pacote" />

                <div className="servicos-box">
                    <Label texto="Serviços Incluídos" tamanho="18px" />

                    <div className="conjuntoInput">
                        <Input
                            name="nomePacote"
                            type="text"
                            placeholder="Digite o nome do pacote"
                            value={formData.nomePacote}
                            onChange={handleChange}
                            className="input-pacote"
                        />
                    </div>

                    <div className="lista-servicos">
                        {servicos.map(({ id, label }) => (
                            <div
                                key={id}
                                className={`card-servico ${formData[id] ? 'selecionado' : ''}`}
                                onClick={() => handleCardClick(id)}
                            >
                                <span>{label}</span>
                                {formData[id] && <FaCheck className="check-icon" />}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="botoes">
                    <Botao texto="Voltar" />
                    <Botao texto="Continuar" />
                </div>
            </div>
        </div>
    );
}
