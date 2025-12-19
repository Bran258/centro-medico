import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import {
    updatePersona,
    updateFotoPersona,
} from "@/service/personas.service";
import { getUsuarioById } from "@/service/usuarios.service";
import { uploadFotoPerfil } from "@/service/storage.service";
import { supabase } from "@/service/supabase";

export function usePerfil() {
    const { user } = useAuth();

    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // CARGAR PERFIL

    useEffect(() => {
        if (!user?.id) {
            setLoading(false);
            return;
        }

        const fetchPerfil = async () => {
            try {
                const data = await getUsuarioById(user.id);
                setPerfil(data);
            } finally {
                setLoading(false);
            }
        };

        fetchPerfil();
    }, [user]);

    // GUARDAR DATOS PERSONA
    const savePerfil = async () => {
        if (!perfil?.persona?.id) return;

        setSaving(true);

        await updatePersona(perfil.persona.id, {
            nombres: perfil.persona.nombres,
            apellidos: perfil.persona.apellidos,
            telefono: perfil.persona.telefono,
            dni: perfil.persona.dni,
        });

        setSaving(false);
    };

    // CAMBIAR FOTO DE PERFIL
    const changeFotoPerfil = async (file) => {
        const fotoUrl = await uploadFotoPerfil(file);

        await updateFotoPersona(perfil.persona.id, fotoUrl);

        setPerfil((prev) => ({
            ...prev,
            persona: {
                ...prev.persona,
                foto_url: fotoUrl,
            },
        }));
    };


    // CAMBIAR PASSWORD

    const changePassword = async (password) => {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
    };

    // CAMBIAR EMAIL
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

