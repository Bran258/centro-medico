import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import { updateMiPersona, updateMiFotoPersona } from "@/service/personas.service";
import { getMiPerfil } from "@/service/usuarios.service";
import { uploadFotoPerfil } from "@/service/storage.service";
import { supabase } from "@/service/supabase";

export function usePerfil() {
  const { user } = useAuth();

  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // CARGAR PERFIL PROPIO
  useEffect(() => {
    if (!user?.id) {
      setLoading(false);
      return;
    }

    const fetchPerfil = async () => {
      try {
        const data = await getMiPerfil();
        setPerfil(data);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, [user?.id]);

  // GUARDAR PERFIL
  const savePerfil = async () => {
    if (!perfil?.persona) return;

    setSaving(true);
    try {
      await updateMiPersona({
        nombres: perfil.persona.nombres,
        apellidos: perfil.persona.apellidos,
        telefono: perfil.persona.telefono,
        dni: perfil.persona.dni,
      });
    } finally {
      setSaving(false);
    }
  };

  // FOTO PERFIL
  const changeFotoPerfil = async (file) => {
    const fotoUrl = await uploadFotoPerfil(file);

    await updateMiFotoPersona(fotoUrl);

    setPerfil((prev) => ({
      ...prev,
      persona: { ...prev.persona, foto_url: fotoUrl },
    }));
  };

  // PASSWORD
  const changePassword = async (password) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
  };

  // EMAIL
  const changeEmail = async (email) => {
    const { error } = await supabase.auth.updateUser(
      { email },
      { emailRedirectTo: import.meta.env.VITE_APP_URL }
    );
    if (error) throw error;
  };

  return {
    perfil,
    setPerfil,
    loading,
    saving,
    savePerfil,
    changeFotoPerfil,
    changePassword,
    changeEmail,
  };
}
