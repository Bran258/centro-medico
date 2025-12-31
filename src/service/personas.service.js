import api from "@/config/api";

// ACTUALIZAR PERSONA
export const updatePersona = async (id, data) => {
  const res = await api.put(`/api/personas/${id}`, data);
  return res.data;
};

// ACTUALIZAR FOTO
export const updateFotoPersona = async (id, foto_url) => {
  const res = await api.put(`/api/personas/${id}/foto`, { foto_url });
  return res.data;
};


// PERFIL PROPIO (admin + asistente)
export const updateMiPersona = async (data) => {
  const res = await api.put("/api/personas/me", data);
  return res.data;
};

export const updateMiFotoPersona = async (foto_url) => {
  const res = await api.put("/api/personas/me", { foto_url });
  return res.data;
};

// OBTENER PERSONA POR ID
export const getPersonaById = async (id) => {
  const res = await api.get(`/api/personas/${id}`);
  return res.data;
};

// CREAR PERSONA
export const createPersona = async (data) => {
  const res = await api.post("/api/personas", data);
  return res.data;
};

// ELIMINAR PERSONA
export const deletePersona = async (id) => {
  const res = await api.delete(`/api/personas/${id}`);
  return res.data;
};

// LISTAR PERSONAS
export const getPersonas = async () => {
  const res = await api.get("/api/personas");
  return res.data;
};


