// src/routers/PrivateRoutes.jsx
import { Navigate } from "react-router-dom";
import { useSession } from "@/hooks/auth/useSession";
import { useEffect, useState } from "react";
import { supabase } from "@/service/supabase";
import Loading from "../error/Loading";

export function PrivateRoutes({ children, allowed }) {
  const { session, loading } = useSession();

  const [role, setRole] = useState(null);
  const [checking, setChecking] = useState(true);

  // Siempre ejecuta TODOS los hooks antes de cualquier return

  useEffect(() => {
    async function loadRole() {
      if (!session?.user?.id) {
        setChecking(false);
        return;
      }

      const { data } = await supabase
        .from("usuarios")
        .select("role")
        .eq("id", session.user.id)
        .single();

      setRole(data?.role || null);
      setChecking(false);
    }

    if (!loading) loadRole();
  }, [loading, session]);

  // Ahora sí vienen los returns, pero DESPUÉS de todos los hooks:

  // Aún cargando sesión
  if (loading) return <Loading />;

  // No hay usuario → login
  if (!session?.user?.id) return <Navigate to="/login/admin" replace />;

  // Todavía consultando el rol
  if (checking) return <p>Verificando permisos...</p>;

  // Rol no autorizado
  if (!allowed.includes(role)) return <Navigate to="/unauthorized" replace />;

  // Todo OK
  return children;
}
