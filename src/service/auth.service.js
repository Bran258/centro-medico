import { supabase } from "@/service/supabase";

export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: true, message: error.message };
  }

  return {
    user: data.user,
    session: data.session,
  };
};

export const logout = async () => {
  await supabase.auth.signOut();
};

