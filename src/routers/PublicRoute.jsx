import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";
import Loading from "@/error/Loading";

export default function PublicRoute({ children }) {
  const { user, role, loading } = useAuth();

  // Esperar sesión + rol
  if (loading) {
    return <Loading />;
  }

  // Si ya hay sesión, redirigir según rol
  if (user && role) {
    if (role === "admin") {
      return <Navigate to="/panel/admin" replace />;
    }

    if (role === "asistente") {
      return <Navigate to="/panel/asistente" replace />;
    }

    return <Navigate to="/" replace />;
  }

  // No hay sesión → mostrar login
  return children;
}
