import api from "@/config/api";

// CLIENTE PÚBLICO
export const createClientePublico = async (data) => {
  const res = await api.post("/api/clientes", data);
  return res.data.cliente; // ← esto es CLAVE
};

// CONTACTO
export const sendContacto = async (data) => {
  const res = await api.post("/api/contacto", data);
  return res.data;
};

