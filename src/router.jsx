import { createBrowserRouter } from "react-router-dom";
import { LoginForm } from "./Pages/Login/LoginForm.jsx";
import { CadastroForm } from "./Pages/Cadastro/CadastroForm.jsx";
import { CadastroFuncForm } from "./Pages/Cadastro/CadastroFuncForm.jsx";
import { RecuperacaoForm } from "./Pages/RecuperacaoSenha/RecuperacaoForm.jsx";
import { EdicaoUsuarioForm } from "./Pages/Edicao Usuario/EdicaoUsuarioForm.jsx";
import { Home } from "./Pages/Home/Home.jsx";

export const routes = createBrowserRouter([
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
    { path: "/",
    element: <Home />,
    errorElement: <div>Erro ao carregar a página</div> },
])