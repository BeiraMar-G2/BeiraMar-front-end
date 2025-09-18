import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Botao } from "../../Components/Botao.jsx";
import { Titulo, Label } from "../../Components/Fontes.jsx";
import { FaHouse } from "react-icons/fa6";
import { Header } from "../../Components/Header.jsx";
import { Sucesso, Erro } from '../../Components/Modal.jsx';
import "../Styles/CadastroServico.css";
import api from '../../Provider/api.js';

export function CadastroServico() {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    idServico: "default",
    nome: '',
    duracao: '',
    descricao: '',
    preco: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    console.log(formData);
    api.post("/servicos", formData)
    .then((response) => {
      console.log(response)
      if(response.status == "201") {
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 6000);
        setTimeout(() => {  
          navigate("/Servicos&Pacotes");
        }, 4000);
      }
    })
  };

  useEffect(() => {
    const box = document.querySelector(".service-content");
    if (box) box.scrollTop = 0;
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

      <Sucesso
            show={showAlert} 
            onClose={() => setShowAlert(false)}
            texto="Serviço criado com sucesso. Vamos vender!  Redirecionando..."
            />

      <div className="tela-servico">
        <span className="titulo-servico">Cadastro de Serviços</span>

        <div className="form-container">
          <div className="form-group">
            <Label texto="Nome do Procedimento" tamanho="18px" />
            <input 
              type="text" 
              name="nome"
              className="input-padrao"
              placeholder="Digite o nome do procedimento"
              value={formData.nome}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <Label texto="Descrição" tamanho="18px" />
            <input 
              type="text" 
              name="descricao"
              className="input-padrao"
              placeholder="Digite a descrição desse serviço"
              value={formData.descricao}
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
              value={formData.duracao}
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
              value={formData.preco}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="botoes-acao">
          <Botao
            texto="Voltar"
            cor="#C8C5C5"
            onClick={() => navigate(-1)}
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