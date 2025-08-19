import { createBrowserRouter } from "react-router-dom";
import { LoginForm } from "./Pages/Login/LoginForm.jsx";
import { CadastroForm } from "./Pages/Cadastro/CadastroForm.jsx";
import { CadastroFuncForm } from "./Pages/Cadastro/CadastroFuncForm.jsx";
import { RecuperacaoForm } from "./Pages/RecuperacaoSenha/RecuperacaoForm.jsx";
import { EdicaoUsuarioForm } from "./Pages/Edicao Usuario/EdicaoUsuarioForm.jsx";
import { Home } from "./Pages/Home/Home.jsx";
import { CadastroPacote } from "./Pages/Cadastro/CadastroPacote.jsx";
import { Calendario } from "./Pages/Login/Calendario.jsx";
import { Menu } from "./Pages/Menu/MenuFunc.jsx";
import { DefinirSessoes } from './Pages/Cadastro Pacote/DefinirSessoes.jsx';
import { PacotesCadastrados } from './Pages/Cadastro Pacote/PacotesCadastrados.jsx';

export const routes = createBrowserRouter([
  {
    path: "/*",
    element: <div style={{color:"#282828"}}>Página não encontrada</div>
  },
  { path: "/Login", 
    element: <LoginForm />, 
    errorElement: <div>Erro ao carregar a página</div> },
  { path: "/Cadastro",
    element: <CadastroForm />,
    errorElement: <div>Erro ao carregar a página</div> },
  { path: "/RecuperacaoSenha",
    element: <RecuperacaoForm />,
    errorElement: <div>Erro ao carregar a página</div> },
    { path: "/Cadastro/Funcionario",
    element: <CadastroFuncForm />,
    errorElement: <div>Erro ao carregar a página</div> },
    { path: "/EdicaoUsuario",
    element: <EdicaoUsuarioForm />,
    errorElement: <div>Erro ao carregar a página</div> },
    { path: "/Calendario",
    element: <Calendario />,
    errorElement: <div>Erro ao carregar a página</div> },
    { path: "/",
    element: <Home />,
    errorElement: <div>Erro ao carregar a página</div> },
    {
    path: "/Cadastro/Pacote",
    element: <CadastroPacote />,
    errorElement: <div>Erro ao carregar a página</div>
    },
    { path: "/Menu",
    element: <Menu />,
    errorElement: <div>Erro ao carregar a página</div> },
    {
      path: "/DefinirSessoes",
      element: <DefinirSessoes />,
      errorElement: <div>Erro ao carregar a página</div>
    },
    {
      path: "/PacotesCadastrados",
      element: <PacotesCadastrados />,
      errorElement: <div>Erro ao carregar a página</div>
    }
])