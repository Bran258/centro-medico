import { supabase } from "@/service/supabase";

export const uploadFotoPerfil = async (file) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Usuario no autenticado");
  }

  const ext = file.name.split(".").pop();
  const fileName = `${user.id}.${ext}`; 

  const { error } = await supabase.storage
    .from("foto_perfil")
    .upload(fileName, file, {
      upsert: true,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("foto_perfil")
    .getPublicUrl(fileName);

  return data.publicUrl;
};


