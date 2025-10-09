import { Navigate } from "react-router-dom";

export function PrivateRoute({ children, allowedRoles }) {
  const userRole = sessionStorage.getItem("cargo");

  if (!allowedRoles.includes(userRole)) {
    alert("Acesso negado! Você será redirecionado para a página de login.");
    return <Navigate to="/Login" />;
  }

  return children;
}