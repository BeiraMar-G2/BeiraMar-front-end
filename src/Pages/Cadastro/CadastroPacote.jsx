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
        nomeServico: '',
        sobrancelha: false,
        massagem: false,
        drenagem: false,
        limpeza: false,
    });
    const [servicos, setServicos] = useState([
        {id: 'sobrancelha', nome: 'Sobrancelha'},
    ]);

    function buscarServico() {
        api.get("/servicos")
            .then((response) => {
                console.log("Serviços disponíveis:", response.data);
                setServicos(response.data.map(servico => ({
                    id: servico.idServico,
                    nome: servico.nome
                })));
                console.log("Serviços atualizados:", servicos);
            })
            .catch((error) => {
                console.error("Erro ao buscar serviços:", error);
            });
    }



    const handleChange = (e) => {
        const {value } = e.target;

        setFormData(prev => ({ ...prev, nomeServico: value }));
        setFiltro(value);
    };

    const handleCardClick = (servico) => {
        setFormData(prev => ({ ...prev, [servico]: !prev[servico] }));
    };

    const servicosFiltrados = servicos.filter(({ nome }) =>
        nome.toLowerCase().includes(filtro.toLowerCase())
    );

    const destacarTexto = (nome) => {
        if (!filtro) return nome;
        const regex = new RegExp(`(${filtro})`, 'gi');
        return nome.replace(regex, '<mark>$1</mark>');
    };

    useEffect(() => {
        buscarServico();
        }, []);

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
                        value={formData.nomeServico}
                        onChange={handleChange}
                        className="input-pacote"
                    />

                    <div className="lista-servicos">
                        {servicosFiltrados.map(({ id, nome }) => (
                            <div
                                key={id}
                                className={`card-servico ${formData[id] ? 'selecionado' : ''}`}
                                onClick={() => handleCardClick(id)}
                            >
                                <span dangerouslySetInnerHTML={{ __html: destacarTexto(nome) }} />
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
