// src/routers/PrivateRoutes.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";
import Loading from "@/error/Loading";

export function PrivateRoutes({ children, allowed }) {
  const { user, role, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user) {
    return <Navigate to="/login/admin" replace />;
  }

  if (!role) {
    return <Navigate to="/pendiente" replace />;
  }

  if (!allowed.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
