import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Botao } from "../../Components/Botao";
import { Link } from "react-router-dom";
import { TituloHome,SubtituloHome,ConteudoHome } from "../../Components/Fontes"
import '../Styles/Botao.css';
import '../Styles/Home.css';
import antesImg1 from "/Assets/Antes img1.png";
import antesImg2 from "/Assets/Antes img2.png";
import antesImg3 from "/Assets/Antes img3.png";



export function Home() {
const images = [antesImg1, antesImg2, antesImg3];


const [currentIndex, setCurrentIndex] = React.useState(0);

React.useEffect(() => {
    const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
}, [images.length]);

return (
    <div className="home">
        <div className="header">
            <div className="navbar">
                <img src={"../../Assets/Logo.png"} alt="" />
                <div className="nav-links">
                    <Link to={"/Cadastro"} className="btn-link alegreya-sans-sc-black-italic">Cadastre-se</Link>
                    <Link to={"/Login"} className="btn-link">Entrar</Link>
                </div>
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
        </div>
        <section>
            <div className="section-content">
                <div className="section-text">
                    <div className="section-title">
                        <TituloHome texto="ACOMPANHE" cor="#CE2D4F"/>
                        <TituloHome texto=" O QUE FAZEMOS"/>
                    </div>
                    <div className="section-subtitle">
                        <SubtituloHome texto="Antes e "/>
                        <SubtituloHome texto="Depois" cor="#CE2D4F"/>
                    </div>
                    <div className="section-description">
                        <ConteudoHome texto="Confira" cor="#CE2D4F"/>
                        <ConteudoHome texto=" alguns resultados da nossa Massagem Modeladora."/>
                    </div>
                </div>
                <div className="carousel">
                    <img src={images[currentIndex]} alt={`Antes ${currentIndex + 1}`} />
                </div>
            </div>
        </section>
    </div>
);
}