import { RouterProvider } from 'react-router-dom'
import { routes } from './router.jsx'

export function App() {

  return (
    <RouterProvider router={routes}/>
  )
}