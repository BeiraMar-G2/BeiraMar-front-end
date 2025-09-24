import { RouterProvider } from 'react-router-dom'
import { routes } from './router.jsx'
import { GoogleOAuthProvider } from'@react-oauth/google'

export function App() {

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={routes}/>
    </GoogleOAuthProvider>
  )
}