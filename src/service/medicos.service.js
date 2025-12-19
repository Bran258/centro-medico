import api from "@/config/api";

// ADMIN: lista todos
export const listarMedicos = async () => {
  const res = await api.get("/api/medicos");
  return res.data;
};


export const crearMedico = async (payload) => {
  const res = await api.post("/api/medicos", payload);
  return res.data;
};

export const actualizarMedico = async (id, payload) => {
  const res = await api.put(`/api/medicos/${id}`, payload);
  return res.data;
};

export const eliminarMedico = async (id) => {
  const res = await api.delete(`/api/medicos/${id}`);
  return res.data;
};

