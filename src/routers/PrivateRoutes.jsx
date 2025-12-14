import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/error/Loading"; // Asegúrate que este componente exista o usa un simple <div>Cargando...</div>

export function PrivateRoutes({ children, allowed }) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <Loading />;

  // 1. Si no está logueado -> Login
  if (!isAuthenticated) {
    return <Navigate to="/login/admin" replace />;
  }

  // 2. Normalizar roles (Backend envía "ADMIN", App espera "admin")
  const userRole = user?.rol ? user.rol.toLowerCase() : "";
  const allowedRoles = allowed.map(r => r.toLowerCase());

  // 3. Si no tiene permiso -> Unauthorized
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}