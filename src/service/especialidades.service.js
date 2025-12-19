// src/service/especialidades.service.js
import api from "@/config/api";

export const getEspecialidades = () =>
  api.get("/api/especialidades");

export const createEspecialidad = (data) =>
  api.post("/api/especialidades", data);

export const updateEspecialidad = (id, data) =>
  api.put(`/api/especialidades/${id}`, data);

export const deleteEspecialidad = (id) =>
  api.delete(`/api/especialidades/${id}`);
