// src/routers/PrivateRoutes.jsx
import { Navigate } from "react-router-dom";
import { useSession } from "@/hooks/auth/useSession";
import { useEffect, useState } from "react";
import { supabase } from "@/service/supabase";
import Loading from "@/error/Loading";

export function PrivateRoutes({ children, allowed }) {
  const { session, loading } = useSession();
  const [role, setRole] = useState(null);
  const [checking, setChecking] = useState(true);

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

  if (loading) return <Loading />;

  if (!session?.user?.id)
    return <Navigate to="/login/admin" replace />;

  if (checking) return <Loading />;

  if (!allowed.includes(role))
    return <Navigate to="/unauthorized" replace />;

  return children;
}