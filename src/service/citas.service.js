import api from "@/config/api";

export const crearCita = async (data) => {
  const res = await api.post("/api/citas", data);
  return res.data;
};

export const listarCitas = async () => {
  const res = await api.get("/api/citas");
  return res.data;
};

export const confirmarCita = async (id, payload) => {
  const res = await api.put(`/api/citas/${id}/confirmar`, payload);
  return res.data;
};

export const cancelarCita = async (id) => {
  const res = await api.put(`/api/citas/${id}/cancelar`);
  return res.data;
};

export const atenderCita = async (id) => {
  const res = await api.put(`/api/citas/${id}/atender`);
  return res.data;
};

export const eliminarCita = async (id) => {
  const res = await api.delete(`/api/citas/${id}`);
  return res.data;
};
