import { createBrowserRouter } from "react-router-dom";
import { LoginForm } from "./Pages/Login/LoginForm.jsx";
import { CadastroForm } from "./Pages/Cadastro/CadastroForm.jsx";
import { CadastroFuncForm } from "./Pages/Cadastro/CadastroFuncForm.jsx";
import { RecuperacaoForm } from "./Pages/RecuperacaoSenha/RecuperacaoForm.jsx";
import { EdicaoUsuarioForm } from "./Pages/Edicao Usuario/EdicaoUsuarioForm.jsx";
import { EdicaoSenha } from "./Pages/Edicao Usuario/EdicaoSenha.jsx";
import { Home } from "./Pages/Home/Home.jsx";
import { CadastroPacote } from "./Pages/Cadastro/CadastroPacote.jsx";
import { VisualizacaoAgendAtend } from "./Pages/Agendamentos/VisualizacaoAgendAtend.jsx";
import { Menu } from "./Pages/Menu/MenuFunc.jsx";
import { DefinirSessoes } from './Pages/Cadastro Pacote/DefinirSessoes.jsx';
import { PacotesCadastrados } from './Pages/Cadastro Pacote/PacotesCadastrados.jsx';
import { ServicosPacotes } from "./Pages/Menu/ServicosPacotes.jsx";
import { RecuperacaoCodigo } from "./Pages/RecuperacaoSenha/RecuperacaoCodigo.jsx";
import { HorarioAgendamento } from "./Pages/Agendamentos/HorarioAgendamento.jsx";
import { VisualizacaoAgendAtendDia } from "./Pages/Agendamentos/VisualizacaoAgendAtendDia.jsx";
import { VisualizacaoAgendClienteDia } from "./Pages/Agendamentos/VisualizacaoAgendClienteDia.jsx";
import { HistoricoAgendCliente } from "./Pages/Agendamentos/HistoricoAgendCliente.jsx";
import { HistoricoAgendAtend } from "./Pages/Agendamentos/HistoricoAgendAtend.jsx";
import { ResumoPacote } from "./Pages/Cadastro Pacote/ResumoPacote.jsx";
import { PacotesCadastradosCliente } from "./Pages/Cadastro Pacote/PacotesCadastradosCliente.jsx";
import { AgendamentoServicoPacote } from "./Pages/Agendamentos/AgendamentoServicoPacote.jsx";
import { MenuCliente } from "./Pages/Menu/MenuCliente.jsx";
import { CadastroServico } from "./Pages/Cadastro/CadastroServico.jsx";
import { EdicaoServico } from "./Pages/Edicao Servico/EdicaoServico.jsx";
import { DashboardMenu } from "./Pages/Dashboards/DashboardMenu.jsx";
import { DashboardRealizado } from "./Pages/Dashboards/DashboardRealizado.jsx";
import { DashboardCancelamento } from "./Pages/Dashboards/DashboardCancelamento.jsx";
import { PrivateRoute } from "./Components/PrivateRoute.jsx";
import { IndisponibilidadeDia } from "./Pages/Indisponibilidade/IndisponibilidadeDia.jsx";
import { IndisponibilidadeHora } from "./Pages/Indisponibilidade/IndisponibilidadeHora.jsx";

export const routes = createBrowserRouter([
  {
    path: "/*",
    element: <div style={{color:"#282828"}}>Página não encontrada</div>
  },
  { 
    path: "/Login", 
    element: (() => {
    localStorage.clear();
    return <LoginForm />;
    })(),
    errorElement: <div>Erro ao carregar a página</div> 
  },
  { 
    path: "/Cadastro",
    element: <CadastroForm />,
    errorElement: <div>Erro ao carregar a página</div> 
  },
  { 
    path: "/RecuperacaoSenha",
    element: <RecuperacaoForm />,
    errorElement: <div>Erro ao carregar a página</div> 
  },
  { 
    path: "/Cadastro/Funcionario",
    element: <CadastroFuncForm />,
    errorElement: <div>Erro ao carregar a página</div> 
  },
  { 
    path: "/Perfil",
    element: <EdicaoUsuarioForm />,
    errorElement: <div>Erro ao carregar a página</div> 
  },
  { 
    path: "/Perfil/Senha",
    element: <EdicaoSenha />,
    errorElement: <div>Erro ao carregar a página</div> 
  },
  { 
    path: "/Agendamentos/Visualizar",
    element: <VisualizacaoAgendAtend />,
    errorElement: <div>Erro ao carregar a página</div> 
  },
  { 
    path: "/Agendamentos/VisualizarPorDia",
    element: <VisualizacaoAgendAtendDia />,
    errorElement: <div>Erro ao carregar a página</div> 
  },
  { 
    path: "/Agendamentos/VisualizarConsultas",
    element: <VisualizacaoAgendClienteDia />,
    errorElement: <div>Erro ao carregar a página</div> 
  },
  { 
    path: "/Agendamentos/HistoricoAgendCliente",
    element: <HistoricoAgendCliente />,
    errorElement: <div>Erro ao carregar a página</div> 
  },
  { 
    path: "/Agendamentos/HistoricoAgendAtend",
    element: <HistoricoAgendAtend />,
    errorElement: <div>Erro ao carregar a página</div> 
  },
  { 
    path: "/",
    element: <Home />,
    errorElement: <div>Erro ao carregar a página</div> 
  },
  { 
    path: "/Menu",
    element: (
    <PrivateRoute allowedRoles={["Administrador", "Atendente"]}>
      <Menu />
    </PrivateRoute>
    ),
    errorElement: <div>Erro ao carregar a página</div> 
  },
  { 
    path: "/Servicos&Pacotes",
    element: (
    <PrivateRoute allowedRoles={["Administrador", "Atendente"]}>
      <ServicosPacotes />
    </PrivateRoute>
    ),
    errorElement: <div>Erro ao carregar a página</div>
  },
  {
    path: "/DefinirSessoes",
    element: <DefinirSessoes />,
    errorElement: <div>Erro ao carregar a página</div>
  },
  {
    path: "/Pacotes",
    element: <PacotesCadastrados />,
    errorElement: <div>Erro ao carregar a página</div>
  },
  {
    path: "/PacotesCliente",
    element: <PacotesCadastradosCliente />,
    errorElement: <div>Erro ao carregar a página</div>
  },
  {
    path: "/RecuperacaoCodigo",
    element: <RecuperacaoCodigo />,
    errorElement: <div>Erro ao carregar a página</div>
  },
  {
    path: "/Agendamentos/Horario",
    element: <HorarioAgendamento />,
    errorElement: <div>Erro ao carregar a página</div>
  },
  {
    path: "/Agendamentos/${tipo}",
    element: <AgendamentoServicoPacote />,
    errorElement: <div>Erro ao carregar a página</div>
  }, 
  {
    path: "/ResumoPacote",
    element: <ResumoPacote />,
    errorElement: <div>Erro ao carregar a página</div>
  },
  {
    path: "/MenuCliente",
    element: (
    <PrivateRoute allowedRoles={["Cliente", "Administrador", "Atendente"]}>
      <MenuCliente />
    </PrivateRoute>
    ),
    errorElement: <div>Erro ao carregar a página</div>
  },
  {
    path: "/Servico/Cadastro",
    element: <CadastroServico />,
    errorElement: <div>Erro ao carregar a página</div>
  },
  {
    path: "/Servico/Edicao",
    element: <EdicaoServico />,
    errorElement: <div>Erro ao carregar a página</div>
  },
  {
    path: "/Pacote/Cadastro",
    element: <CadastroPacote />,
    errorElement: <div>Erro ao carregar a página</div>
  },
  {
    path: "/Dashboard/Menu",
    element: <DashboardMenu />,
    errorElement: <div>Erro ao carregar a página</div>
  },
  {
    path: "/Dashboard/Realizado",
    element: <DashboardRealizado />,
    errorElement: <div>Erro ao carregar a página</div>
  },
  {
    path: "/Dashboard/Cancelamento",
    element: <DashboardCancelamento />,
    errorElement: <div>Erro ao carregar a página</div>
  },
  {
    path: "/Indisponibilidade",
    element: <IndisponibilidadeDia />,
    errorElement: <div>Erro ao carregar a página</div>
  },
  {
    path: "/Indisponibilidade/Hora",
    element: <IndisponibilidadeHora />,
    errorElement: <div>Erro ao carregar a página</div>
  },
]);