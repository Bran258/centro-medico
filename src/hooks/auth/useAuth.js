// src/hooks/auth/useAuth.js
import { supabase } from "@/service/supabase";

export function useAuth() {
  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { error: error.message };

    const user = data.user;

    const { data: userData } = await supabase
      .from("usuarios")
      .select("role")
      .eq("id", user.id)
      .single();

    return { user, role: userData?.role || null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return { login, logout };
}
