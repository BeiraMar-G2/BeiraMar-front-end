import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Botao } from "../../Components/Botao.jsx";
import { Titulo, Label } from "../../Components/Fontes.jsx";
import { FaHouse } from "react-icons/fa6";
import { Header } from "../../Components/Header.jsx";
import "../Styles/CadastroServico.css";

export function CadastroServico() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeProcedimento: '',
    duracao: '',
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
    e.preventDefault();
    console.log(formData);
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
        texto="Retornar ao Menu"
        color="#282828"
      />

      <div className="tela-servico">
        <span className="titulo-servico">Cadastro de Serviços</span>

        <div className="form-container">
          <div className="form-group">
            <Label texto="Nome do Procedimento" tamanho="18px" />
            <input 
              type="text" 
              name="nomeProcedimento"
              className="input-padrao"
              placeholder="Digite o nome do procedimento"
              value={formData.nomeProcedimento}
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

        <div className="botoes">
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