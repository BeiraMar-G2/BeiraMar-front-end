// SPA = Single Page Application
// jsx -> JavaScript + Html
import { RouterProvider } from 'react-router-dom'
import { routes } from './router.jsx'

export function App() {

  return (
    // Tela de menu usuário
    // <div className='menu'>
    //   <div className='alinhamento'>
    //   <Botao texto="Próximos Agendamentos"/> 
    //   <Botao texto="Serviços e Pacotes"/> 
    //   </div>
    //   <div className='alinhamento'>
    //   <BotaoMenu texto="Histórico de Agendamentos"/> 
    //   <Botao texto="Perfil"/> 
    //   </div>
    // </div>
    
    
    //Tela de Login
    <RouterProvider router={routes}/>
    
    
  )
}