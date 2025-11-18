import React from "react";
import { useState, useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TituloHome,SubtituloHome,ConteudoHome } from "../../Components/Fontes"
import antesImg1 from "/Assets/Antes img1.png";
import antesImg2 from "/Assets/Antes img2.png";
import antesImg3 from "/Assets/Antes img3.png";
import depoisImg1 from "/Assets/Depois img1.png";
import depoisImg2 from "/Assets/Depois img2.png";
import depoisImg3 from "/Assets/Depois img3.png";
import '../Styles/Botao.css';
import '../Styles/Home.css';

export function Home() {
const imagesA = [antesImg1, antesImg2, antesImg3];
const imagesD = [depoisImg1, depoisImg2, depoisImg3];

const [currentIndexA, setCurrentIndexA] = React.useState(0);
const [currentIndexD, setCurrentIndexD] = React.useState(0);

const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 275) { // Limite de pixels para considerar como scroll
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

React.useEffect(() => {
    const intervalA = setInterval(() => {
        setCurrentIndexA((prev) => (prev + 1) % imagesA.length);
    }, 2500);
    return () => clearInterval(intervalA);
}, [imagesA.length]);

React.useEffect(() => {
    const intervalD = setInterval(() => {
        setCurrentIndexD((prev) => (prev + 1) % imagesD.length);
    }, 2500);
    return () => clearInterval(intervalD);
}, [imagesD.length]);


return (
    <div className="home">
        <header>
            <div>
              {isScrolled ? (
                <div>
                    <button onClick={() => {
                        const menu = document.querySelector('.menu-hamburguer-aberto');
                        const menuBackground = document.querySelector('.background-menu');
                        if (menu) {
                            menu.style.display = 'flex';
                            menuBackground.style.display = 'block';
                        }
                    }} className="menu-hamburguer-fechado">
                        ☰
                    </button>
                    <div onClick={() => {
                            const menu = document.querySelector('.menu-hamburguer-aberto');
                            const menuBackground = document.querySelector('.background-menu');
                            if (menu) {
                                menu.style.display = 'none';
                                menuBackground.style.display = 'none';
                            }
                        }} className="background-menu">
                    </div>
                    <div className="menu-hamburguer-aberto">
                        <div onClick={() => {
                            const menu = document.querySelector('.menu-hamburguer-aberto');
                            const menuBackground = document.querySelector('.background-menu');
                            if (menu) {
                                menu.style.display = 'none';
                                menuBackground.style.display = 'none';
                            }
                        }} className="fechar-menu"><IoClose /></div>
                        <img src="../../Assets/Logo.png" alt="" />
                        <Link to={"/Cadastro"}>Cadastre-se</Link>
                        <Link to={"/Login"}>Login</Link>
                        <Link>Serviços</Link>
                    </div>
                </div>
              ) : (
                <nav>
                    <img src={"../../Assets/Logo.png"} alt="" />
                    <div className="nav-links">
                        <Link to={"/Cadastro"} className="btn-link ">Cadastre-se</Link>
                        <Link to={"/Login"} className="btn-link">Entrar</Link>
                    </div>
                </nav>
              )}
            </div>
            <div className="header-title">
                <div>
                    <TituloHome texto="O TOQUE QUE" cor="#f8f8f8"/> <br />
                    <TituloHome texto="TRANSFORMA" cor="#CE2D4F"/>
                    <TituloHome texto="," cor="#f8f8f8"/> <br />
                    <TituloHome texto="A BELEZA QUE " cor="#f8f8f8"/>
                    <TituloHome texto="INSPIRA" cor="#90FCF9"/>
                </div>
                <div className="subtitulo-wrapper">
                    <SubtituloHome texto="Cada detalhe do seu cuidado pensado para realçar sua melhor versão." cor="#f8f8f8"/>
                </div>
            </div>
        </header>

        <section>
            <div className="section-content">
                <div className="section-text">
                    <div className="section-title">
                        <TituloHome texto="ACOMPANHE" cor="#CE2D4F"/>
                        <TituloHome texto=" O QUE FAZEMOS"/>
                    </div>
                    <div className="section-subtitle">
                        <SubtituloHome texto="Antes" cor="#CE2D4F"/>
                        <SubtituloHome texto=" e Depois"/>
                    </div>
                    <div className="section-description">
                        <ConteudoHome texto="Confira" cor="#CE2D4F"/>
                        <ConteudoHome texto=" alguns resultados da nossa Massagem Modeladora."/>
                    </div>
                </div>
                <hr />
                <SubtituloHome texto="Antes" cor="#CE2D4F"/>
                <div className="carrossel">
                    <img src={imagesA[currentIndexA]} alt={`Antes ${currentIndexA + 1}`} />
                </div>
                <hr />
                <SubtituloHome style={{alignSelf: "flex-end"}} texto="Depois" cor="#CE2D4F"/>
                <div className="carrossel">
                    <img src={imagesD[currentIndexD]} alt={`Depois ${currentIndexD + 1}`} />
                </div>
                <hr />
            </div>
        </section>

        <section>
            <div className="section-content">
                <div className="section-text">
                    <div className="section-title">
                        <TituloHome texto="Como Podemos Te "/>
                        <TituloHome texto=" Ajudar" cor="#CE2D4F"/>
                        <TituloHome texto="?"/>
                    </div>
                    <div className="section-subtitle">
                        <ConteudoHome texto="Conheça abaixo nosso portifólio base de serviços especialmente pensados para sua "/>
                        <ConteudoHome texto="beleza" cor="#CE2D4F"/>
                        <ConteudoHome texto=","/>
                        <ConteudoHome texto=" saúde" cor="#CE2D4F"/>
                        <ConteudoHome texto=" e "/>
                        <ConteudoHome texto="bem-estar." cor="#CE2D4F"/>
                    </div>
                    <hr />
                    <div className="servicos-img-wrapper">
                        <img src="../../Assets/Design com Henna.png" alt="" />
                        <br />
                        <SubtituloHome texto="Design de Sobrancelha com Henna"/>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div className="section-content">
                <div className="section-text">
                    <div className="section-title">
                        <TituloHome texto="Quem" cor="#CE2D4F"/>
                        <TituloHome texto=" Somos?"/>
                    </div>
                    <div className="section-subtitle">
                        <SubtituloHome texto="Conheça um pouco mais sobre nossa"/>
                        <SubtituloHome texto=" história " cor="#CE2D4F"/>
                        <SubtituloHome texto="e nossa"/>
                        <SubtituloHome texto=" missão" cor="#CE2D4F"/>
                        <SubtituloHome texto="."/>
                    </div>
                    <div className="section-description sobre">
                        <hr style={{alignSelf: "center", width: "90%"}}/>
                        <ConteudoHome texto="Olá! sou a Ana Carla, uma empreendedora na estética a cerca de 4 anos, ganhei parte da minha experiência em trabalhos posteriores e através da minha formação em Estética."/> <br />
                        <hr style={{alignSelf: "center", width: "70%"}}/>
                        <ConteudoHome texto="Todo meu aprendizado e dedicação formam uma profissional apaixonada e sonhadora no que faz, com o sonho de expandir minha marca e impactar cada vez mais pessoas."/>
                        <hr style={{alignSelf: "center", width: "90%"}}/>
                        <img src="../../Assets/Foto Quem Somos.png" alt="" />
                    </div>
                </div>
            </div>
        </section>

        <footer>
            <div className="logo-footer">
            </div>
            <div className="footer-content">
                <div className="footer-links">
                    <div className="footer-links-column">
                        <SubtituloHome texto="Links Rápidos"/>
                        <Link to={"/Login"}>Login</Link>
                        <Link to={"/Cadastro"}>Cadastro</Link>
                    </div>
                    <div className="footer-links-column">
                        <SubtituloHome texto="Contato"/>
                        <Link style={{display: "flex", alignItems: "center"}} to={"https://www.instagram.com/estetik_ac/"}><FaInstagram style={{height:"20px", width:"20px"}}/>Ana Carla</Link>
                    </div>
                </div>
            </div>

        </footer>
    </div>
);
}