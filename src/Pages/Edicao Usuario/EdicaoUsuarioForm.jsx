import { useRef, useState } from "react";
import { IoIosBrush, IoIosMail } from "react-icons/io";
import { FaPhone, FaUser } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Botao } from "../../Components/Botao.jsx";
import { Input } from "../../Components/Input.jsx";
import { Label } from "../../Components/Fontes.jsx";
import api from "../../Provider/api.js";
import "../Styles/Form.css";
import "../Styles/Input.css";
import "../Styles/Fontes.css";
import "../Styles/Botao.css";

export function EdicaoUsuarioForm() {
  const navigate = useNavigate();
  const inputFileRef = useRef(null);
  const [atualizados, setAtualizados] = useState([

  ]);

  const [nome, setNome] = useState(localStorage.getItem("nome") || "");
  const [telefone, setTelefone] = useState(localStorage.getItem("telefone") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [fileURL, setFileURL] = useState(null);

  const handleAtualizar = () => {
    if (fotoPerfil) {
      const formData = new FormData();
    formData.append("file", fotoPerfil);

    api.post("/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log("Foto de perfil enviada com sucesso:", response.data);
        localStorage.setItem("fotoId", response.data.id);
        setAtualizados([...atualizados, "Foto de Perfil"]);
      })
      .catch((error) => {
        console.error("Erro ao enviar a foto de perfil:", error);
      });
    }

    api.put(`clientes/${localStorage.getItem('idUsuario')}/foto?fotoId=${localStorage.getItem('fotoId')}`)
    .then((response) => {
      console.log("Foto de perfil associada com sucesso:", response.data);
      setAtualizados([...atualizados, "Foto de Perfil Associada"]);
    })
    .catch((error) => {
      console.error("Erro ao associar a foto de perfil:", error);
    });
    api.put(`/clientes/${localStorage.getItem('idUsuario')}`, {
      nome,
      telefone,
      email,
    })
      .then((response) => {
        console.log("Dados atualizados com sucesso:", response.data);
        localStorage.setItem("nome", nome);
        localStorage.setItem("telefone", telefone);
        localStorage.setItem("email", email);
        setAtualizados([...atualizados, "Dados Pessoais"]);
      })
      .catch((error) => {
        console.error("Erro ao atualizar os dados:", error);
      });

      console.log("Atualizações realizadas:", atualizados);
  };

  const handleIconClick = () => {
    inputFileRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFotoPerfil(file);
      setFileURL(fileURL);
    }
  };

  return (
    <div className="content cliente">
      <div onClick={() => navigate("/MenuCliente")} className="voltar-wrapper">
        <FaArrowLeft size={28} color="#000" className="voltar" />
      </div>
      <div className="formulario">
        <div className="inputs">
          <Label texto="Foto de Perfil" />
          <div className="fotoPerfil" style={{ backgroundImage: `url(${fileURL})` }} onClick={handleIconClick}>
            {console.log(fotoPerfil)}
            <input
              ref={inputFileRef}
              className="input-file"
              type="file"
              onChange={handleFileChange}
              style={{ backdropFilter: "blur(400px)" }}
              />
            <IoIosBrush className="icon-file" size={30} />
          </div>
          <Label texto="Nome" />
          <div className="conjuntoInput">
            <Input
              onChange={setNome}
              valor="nome"
              type="text"
              value={nome}
              placeholder="Insira seu nome"
            />
            <FaUser className="icon" size={24} />
          </div>
          <Label texto="Telefone" />
          <div className="conjuntoInput">
            <Input
              onChange={setTelefone}
              valor="telefone"
              type="text"
              value={telefone}
              placeholder="Insira seu telefone"
            />
            <FaPhone className="icon" size={24} />
          </div>
          <Label texto="Email" />
          <div className="conjuntoInput">
            <Input
              onChange={setEmail}
              valor="email"
              type="text"
              value={email}
              placeholder="Insira seu email"
            />
            <IoIosMail className="icon" size={30} />
          </div>
        </div>
        <Botao
          onClick={() => {
            handleAtualizar();
          }}
          texto="Salvar"
          cor="#f8c7ccbb"
        />
        <div className="alterarSenha">
          <Botao
            texto="Alterar Senha"
            cor="#f8c7ccbb"
            onClick={() => {
              navigate("/Perfil/Senha");
            }}
          />
          <FaArrowRight size={18} color="#282828" />
        </div>
      </div>
    </div>
  );
}


