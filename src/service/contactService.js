import { supabase } from "./supabase";

export async function sendContactMessage(form) {
  const { nombre, email, asunto, mensaje } = form;

  const { data, error } = await supabase
    .from("contactanos")
    .insert([{ nombre, email, asunto, mensaje }]);  

  if (error) throw error;
  return data;
}
