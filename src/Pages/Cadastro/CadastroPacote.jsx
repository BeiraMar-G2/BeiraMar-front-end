import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Botao } from '../../Components/Botao.jsx';
import { InputPesquisa } from '../../Components/Input.jsx';
import { Header } from '../../Components/Header.jsx';
import { FaHouse } from "react-icons/fa6";
import { Titulo, Subtitulo } from '../../Components/Fontes.jsx';
import { FaCheck } from 'react-icons/fa';
import { useEffect } from "react";
import '../Styles/CadastroPacote.css';
import api from '../../Provider/api.js'; 

export function CadastroPacote() {
    
    const navigate = useNavigate();
    const [filtro, setFiltro] = useState('');
    const [formData, setFormData] = useState({
    });
    const [servicos, setServicos] = useState([
    ]);

    function buscarServico() {
        api.get("/servicos")
            .then((response) => {
                setServicos(response.data.map(servico => ({
                    id: servico.idServico,
                    nome: servico.nome
                })));
                setFormData(response.data.map(servico => ({
                    id: servico.idServico,
                    nomeServico: servico.nome,
                    selecionado: false
                })));
            })
            .catch((error) => {
                console.error("Erro ao buscar serviços:", error);
            });
    }

    const handleChange = (e) => {
        const {value } = e.target;  
        setFiltro(value);
    };

    const handleCardClick = (id, nome, selecionado) => {
        setFormData(prev => (prev.map(servico =>
            servico.id === id 
            ? { ...servico, selecionado: !servico.selecionado } 
            : servico
        )));
    };

    const servicosFiltrados = servicos.filter(({ nome }) =>
        nome.toLowerCase().includes(filtro.toLowerCase())
    );

    const destacarTexto = (nome) => {
        if (!filtro) return nome;
        const regex = new RegExp(`(${filtro})`, 'gi');
        return nome;
    };

    useEffect(() => {
        buscarServico();
        }, []);

    return (
        <div className="content pacote">
            <Header alinhamento="flex-start" padding="0 10px" icone={<FaHouse size={28}/>} texto="Retornar ao Menu" color="#282828"/>
            
            <div className="tela1">
                <Titulo texto="Cadastro de Pacotes" className="titulo" />
                <h3 className="titulo-servicos">Serviços do Pacote</h3>

                <div className="servicos-box">
                    
                    <Subtitulo texto="Serviços Incluídos" tamanho="18px" />

                    <InputPesquisa
                        name="nomeServico"
                        type="text"
                        placeholder="Digite o nome do serviço"    
                        value={formData.nomeServico}
                        onChange={handleChange}
                        className="input-pacote"
                    />

                    <div className="lista-servicos">
                        {servicosFiltrados.map(({ id, nome }) => (
                            <div
                                key={id}
                                className={`card-servico ${formData[id-1].selecionado ? 'selecionado' : ''}`}
                                onClick={() => {handleCardClick(id, nome, formData[id-1].selecionado) 
                                }}
                            >
                                <span dangerouslySetInnerHTML={{ __html: destacarTexto(nome) }} />
                                {formData[id-1].selecionado && <FaCheck className="check-icon" />}
                            </div>
                        ))}
                        {servicosFiltrados.length === 0 && (
                            <div className="card-servico vazio">Nenhum serviço encontrado</div>
                        )}
                    </div>
                </div>

                <div className="botoes">
                    <Botao texto="Voltar" cor="#C8C5C5" onClick={() => navigate("/")} />
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
