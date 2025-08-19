import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Botao } from '../../Components/Botao.jsx';
import { InputPesquisa } from '../../Components/Input.jsx';
import { Header } from '../../Components/Header.jsx';
import { FaHouse } from "react-icons/fa6";
import { Titulo, Subtitulo } from '../../Components/Fontes.jsx';
import { FaCheck } from 'react-icons/fa';
import '../Styles/CadastroPacote.css';

export function CadastroPacote() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nomeServico: '',
        sobrancelha: false,
        massagem: false,
        drenagem: false,
        limpeza: false,
    });

    const [filtro, setFiltro] = useState('');

    const handleChange = (e) => {
        if (!e || !e.target) return;

        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'nomeServico') {
            setFiltro(value.toLowerCase());
        }
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

    const servicosFiltrados = servicos.filter(({ label }) =>
        label.toLowerCase().includes(filtro)
    );

    const destacarTexto = (label) => {
        if (!filtro) return label;
        const regex = new RegExp(`(${filtro})`, 'gi');
        return label.replace(regex, '<mark>$1</mark>');
    };

    return (
        <div className="content pacote">
            <Header alinhamento="flex-start" padding="0 10px" icone={<FaHouse size={28}/>} texto="Retornar ao Menu"/>
            
            <div className="formulario">
                <Titulo texto="Cadastro de Pacotes" />
                <Subtitulo texto="Serviços do Pacote" />

                <div className="servicos-box">
                    
                    <Subtitulo texto="Serviços Incluídos" tamanho="18px" />

                    <InputPesquisa
                        name="nomeServico"
                        type="text"
                        placeholder="Digite o nome do serviço"    
                        value={formData.nomePacote}
                        onChange={handleChange}
                        className="input-pacote"
                    />

                    <div className="lista-servicos">
                        {servicosFiltrados.map(({ id, label }) => (
                            <div
                                key={id}
                                className={`card-servico ${formData[id] ? 'selecionado' : ''}`}
                                onClick={() => handleCardClick(id)}
                            >
                                <span dangerouslySetInnerHTML={{ __html: destacarTexto(label) }} />
                                {formData[id] && <FaCheck className="check-icon" />}
                            </div>
                        ))}
                        {servicosFiltrados.length === 0 && (
                            <div className="card-servico vazio">Nenhum serviço encontrado</div>
                        )}
                    </div>
                </div>

                <div className="botoes">
                    <Botao texto="Voltar" cor="cinza" onClick={() => navigate("/")} />
                    <Botao 
                        texto="Continuar" 
                        onClick={() => navigate("/DefinirSessoes", { state: { servicosSelecionados: formData } })} 
                    />
                </div>
            </div>
        </div>
    );
}
