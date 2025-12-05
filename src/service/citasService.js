import { supabase } from "./supabase";

export async function registrarCita({ paciente, telefono, sintomas, fecha, hora, tipoCita }) {

  const fechaISO = fecha.toISOString().split("T")[0]; // Convertir fecha a YYYY-MM-DD

  const { data, error } = await supabase
    .from("citas")
    .insert([
      {
        paciente,
        telefono,
        sintomas,
        fecha: fechaISO,
        hora,
        tipo_cita: tipoCita,
      }
    ]);

  if (error) throw error;

  return data;
}
