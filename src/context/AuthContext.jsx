import { createContext, useEffect, useState } from "react";
import { supabase } from "@/service/supabase";
import api from "@/config/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restaurar sesión
  useEffect(() => {
    const restoreSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data.session?.user) {
        setLoading(false);
        return;
      }

      setUser(data.session.user);

      try {
        const res = await api.get(
          `/api/usuarios/supabase/${data.session.user.id}`
        );
        setRole(res.data.role?.toLowerCase() ?? null);
      } catch {
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // LOGIN
  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { error: true };

    setUser(data.user);
    return { user: data.user };
  };

  // OBTENER ROL
  const getUserRole = async (supabaseUserId) => {
    try {
      const res = await api.get(
        `/api/usuarios/supabase/${supabaseUserId}`
      );
      const roleValue = res.data.role?.toLowerCase() ?? null;
      setRole(roleValue);
      return { role: roleValue };
    } catch {
      return { error: true };
    }
  };

  // LOGOUT
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        login,
        logout,
        getUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
