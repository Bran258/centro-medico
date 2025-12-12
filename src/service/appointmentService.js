import { supabase } from "../config/supabaseClient.js";

// 1. Obtener lista de doctores desde la Base de Datos
export const getDoctores = async () => {
    const { data, error } = await supabase
        .from('doctores')
        .select('*');

    if (error) console.error("Error cargando doctores:", error);
    return data || [];
};

// 2. Lógica principal: Agendar Cita
export const agendarCita = async (dni, doctorId, fecha) => {
    try {
        // A. Contar cuántas citas tiene ese doctor ese día
        const { count, error: countError } = await supabase
            .from('citas')
            .select('*', { count: 'exact', head: true }) // 'head: true' solo cuenta, no descarga datos
            .eq('doctor_id', doctorId)
            .eq('fecha_cita', fecha);

        if (countError) throw countError;

        // B. Obtener límite del doctor
        const { data: doctorData } = await supabase
            .from('doctores')
            .select('max_pacientes, nombre')
            .eq('id', doctorId)
            .single();

        // REGLA DE NEGOCIO: Validar Máximo (6)
        if (count >= doctorData.max_pacientes) {
            return {
                success: false,
                message: `⛔ El Dr. ${doctorData.nombre} ya tiene ${count} pacientes para hoy. Cupo lleno.`
            };
        }

        // C. Validar duplicados (Si el paciente ya tiene cita con ese doctor hoy)
        const { data: existingCita } = await supabase
            .from('citas')
            .select('id')
            .eq('dni_paciente', dni)
            .eq('doctor_id', doctorId)
            .eq('fecha_cita', fecha)
            .maybeSingle();

        if (existingCita) {
            return { success: false, message: "⚠️ Este paciente ya tiene cita con este doctor hoy." };
        }

        // D. Insertar la cita si todo está bien
        const { error: insertError } = await supabase
            .from('citas')
            .insert([
                { dni_paciente: dni, doctor_id: doctorId, fecha_cita: fecha }
            ]);

        if (insertError) throw insertError;

        return { success: true, message: "✅ Cita registrada exitosamente en la Base de Datos." };

    } catch (error) {
        console.error("Error del sistema:", error);
        return { success: false, message: "Error de conexión con la base de datos." };
    }
};

export const consultarCitasPorDni = async (dni) => {
    try {
        // Buscamos en la tabla 'citas' y pedimos también los datos de la tabla 'doctores'
        const { data, error } = await supabase
            .from('citas')
            .select(`
        id,
        fecha_cita,
        dni_paciente,
        doctor_id,
        doctores ( nombre, especialidad )
      `)
            .eq('dni_paciente', dni);

        if (error) throw error;

        return { success: true, data: data };

    } catch (error) {
        console.error("Error buscando citas:", error);
        return { success: false, data: [] };
    }
};