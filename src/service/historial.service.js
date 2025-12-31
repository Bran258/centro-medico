import api from "@/config/api";

export const createHistorial = async (data) => {
  const res = await api.post("/api/historial", data);
  return res.data.historial;
};

export const getHistorial = async () => {
  const res = await api.get("/api/historial");
  return res.data;
};
