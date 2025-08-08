import { Botao } from "../../Components/Botao";
import { Link } from "react-router-dom";
import { TituloHome,SubtituloHome } from "../../Components/Fontes"
import '../Styles/Botao.css'
import '../Styles/Home.css'

export function Home() {
  return (
    <div className="home">
        <div className="header">
            <div className="navbar">
                <img src="../../Assets/Logo.png" alt="" />
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
                    <div>
                        <TituloHome destaque="ACOMPANHE" cor="#CE2D4F"/>
                        <TituloHome texto=" O QUE FAZEMOS"/>
                    </div>
                    <SubtituloHome texto="Antes e Depois"/>
                </div>
            </div>
        </section>
    </div>
  );
}