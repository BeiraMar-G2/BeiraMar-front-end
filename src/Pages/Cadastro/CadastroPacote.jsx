import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Botao } from '../../Components/Botao.jsx';
import { InputPesquisa } from '../../Components/Input.jsx';
import { Header } from '../../Components/Header.jsx';
import { FaHouse } from "react-icons/fa6";
import { Titulo, Subtitulo } from '../../Components/Fontes.jsx';
import { FaCheck } from 'react-icons/fa';
import '../Styles/CadastroPacote.css';
import api from '../../Provider/api.js'; 

export function CadastroPacote() {
    const navigate = useNavigate();
    const [filtro, setFiltro] = useState('');
    const [formData, setFormData] = useState([]);
    const [servicos, setServicos] = useState([]);

    function buscarServico() {
        api.get("/servicos")
            .then((response) => {
                const servicosData = response.data.map(servico => ({
                    id: servico.idServico,
                    nomeServico: servico.nome,
                    preco: servico.preco,
                    selecionado: false
                }));
                setServicos(servicosData);
                setFormData(servicosData);
            })
            .catch((error) => {
                console.error("Erro ao buscar serviços:", error);
            });
    }

    const handleChange = (e) => {
        const { value } = e.target;  
        setFiltro(value);
    };

    const handleCardClick = (id) => {
        setFormData(prev =>
            prev.map(servico =>
                servico.id === id
                    ? { ...servico, selecionado: !servico.selecionado }
                    : servico
            )
        );
    };

    const servicosFiltrados = servicos.filter(({ nomeServico }) =>
        nomeServico.toLowerCase().includes(filtro.toLowerCase())
    );

    const destacarTexto = (nome) => {
        if (!filtro) return nome;
        const regex = new RegExp(`(${filtro})`, 'gi');
        return nome.replace(regex, '<strong>$1</strong>');
    };

    useEffect(() => {
        buscarServico();
    }, []);

    return (
        <div className="content pacote">
            <Header alinhamento="flex-start" padding="0 10px" icone={<FaHouse size={28}/>} texto="Menu" color="#282828"/>
            
            <div className="tela1">
                <Titulo texto="Cadastro de Pacotes" className="titulo" />
                <h3 className="titulo-servicos">Serviços do Pacote</h3>

                <div className="servicos-box">
                    <Subtitulo texto="Serviços Incluídos" tamanho="18px" />

                    <InputPesquisa
                        name="nomeServico"
                        type="text"
                        placeholder="Digite o nome do serviço"    
                        value={filtro}
                        onChange={handleChange}
                        className="input-pacote"
                    />

                    <div className="lista-servicos">
                        {servicosFiltrados.map(({ id, nomeServico }) => {
                            const servico = formData.find(s => s.id === id); // Localiza o serviço correspondente
                            return (
                                <div
                                    key={id}
                                    className={`card-servico ${servico?.selecionado ? 'selecionado' : ''}`}
                                    onClick={() => handleCardClick(id)}
                                >
                                    <span dangerouslySetInnerHTML={{ __html: destacarTexto(nomeServico) }} />
                                    {servico?.selecionado && <FaCheck className="check-icon" />}
                                </div>
                            );
                        })}
                        {servicosFiltrados.length === 0 && (
                            <div className="card-servico vazio">Nenhum serviço encontrado</div>
                        )}
                    </div>
                </div>

                <div className="botoes">
                    <Botao texto="Voltar" cor="#C8C5C5" onClick={() => navigate(-1)} />
                    <Botao 
                        texto="Continuar" 
                        cor="#f8c7ccbb" 
                        onClick={() => navigate("/DefinirSessoes", { state: { servicosSelecionados: formData.filter(servico => servico.selecionado) } })} 
                    />
                </div>
            </div>
        </div>
    );
}
