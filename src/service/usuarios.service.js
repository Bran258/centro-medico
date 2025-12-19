import api from "@/config/api";

// LISTAR (ADMIN)
export const getUsuarios = async () => {
  const res = await api.get("/api/usuarios");
  return res.data;
};

// OBTENER USUARIO POR ID (PERFIL)
export const getUsuarioById = async (id) => {
  const res = await api.get(`/api/usuarios/${id}`);
  return res.data;
};
// ACTUALIZAR USUARIO (PERFIL)
export const updateUsuario = async (id, data) => {
  const res = await api.put(`/api/usuarios/${id}`, data);
  return res.data;
};
// ELIMINAR USUARIO (ADMIN)
export const deleteUsuario = async (id) => {
  const res = await api.delete(`/api/usuarios/${id}`);
  return res.data;
};
// CAMBIAR CONTRASEÑA (PERFIL)
export const changePassword = async (id, data) => {
  const res = await api.put(`/api/usuarios/${id}/change-password`, data);
  return res.data;
};
// CREAR USUARIO (ADMIN)
export const createUsuario = async (data) => {
  const res = await api.post("/api/usuarios", data);
  return res.data;
};
