import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigation } from "../../Hooks/useNavigation";
import { Botao } from "../../Components/Botao.jsx";
import { Label } from "../../Components/Fontes.jsx";
import { FaHouse } from "react-icons/fa6";
import { Header } from "../../Components/Header.jsx";
import "../Styles/CadastroServico.css";
import api from '../../Provider/api.js';

export function EdicaoServico() {
  const { handleNavigate } = useNavigation();
  const [formData, setFormData] = useState({
    nomeProcedimento: '',
    duracao: '',
    preco: ''
  });
  const location = useLocation();
  const { servicoEditado = [] } = location.state || {};
  const [ servicoSelecionado, setServicoSelecionado ] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServicoSelecionado(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    if(servicoEditado.nome === "" || servicoEditado.duracao === "" || servicoEditado.preco === ""){
        alert("Preencha todos os campos!");
    } else {
      console.log("Serviço selecionado:", servicoSelecionado);
        api.put(`/servicos/${servicoEditado.id}`, {
            nome: servicoSelecionado.nome,
            duracao: Number(servicoSelecionado.duracao),
            preco: Number(servicoSelecionado.preco),
            descricao: servicoEditado.descricao
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error("Erro ao atualizar o serviço:", error);
        });
    }
  };

  function buscarServico(id) {
    api.get(`/servicos/${id}`)
    .then((response) => {
        console.log(response)
        setServicoSelecionado(response.data)
    })
}

  useEffect(() => {
    const box = document.querySelector(".service-content");
    buscarServico(Number(servicoEditado.id))
  }, []);

  return (
      <div className="content cadastro-servico">
      <Header
        alinhamento="flex-start"
        padding="0 10px"
        icone={<FaHouse size={28} />}
        texto="Menu"
        color="#282828"
      />

      <div className="tela-servico">
        <span className="titulo-servico">Edição de Serviços</span>
        <Label texto="Altere somente os campos a serem atualizados" tamanho="18px" />

        <div className="form-container">
          <div className="form-group">
            <Label texto="Nome do Procedimento" tamanho="18px" />
            <input 
              type="text" 
              name="nome"
              className="input-padrao"
              placeholder="Digite o nome do procedimento"
              value={servicoSelecionado.nome}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <Label texto="Duração" tamanho="18px" />
            <input 
              type="number" 
              name="duracao"
              className="input-padrao"
              placeholder="Digite a duração em Minutos"
              value={servicoSelecionado.duracao}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <Label texto="Preço" tamanho="18px" />
            <input 
              type="number" 
              name="preco"
              className="input-padrao"
              placeholder="Digite o preço desejado"
              value={servicoSelecionado.preco}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="botoes">
          <Botao
            texto="Voltar"
            cor="#C8C5C5"
            onClick={() => handleNavigate(-1)}
          />
          <Botao
            texto="Continuar"
            cor="#f8c7ccbb"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}