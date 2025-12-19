import api from "@/config/api";

export const getDashboardStats = async () => {
  const res = await api.get("/api/dashboard/stats");
  return res.data;
};

export const getCitasPorEstado = async () => {
  const res = await api.get("/api/dashboard/citas-por-estado");
  return res.data;
};

export const getCitasUltimos7Dias = async () => {
  const res = await api.get("/api/dashboard/citas-ultimos-7-dias");
  return res.data;
};

export const getProximasCitas = async () => {
  const res = await api.get("/api/dashboard/proximas-citas");
  return res.data;
};
