
import { useEffect, useState } from "react";
import {
  getUsuarios,
  deleteUsuario,
} from "@/service/usuarios.service";

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarUsuarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (err) {
      setError("Error al cargar usuarios");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      await deleteUsuario(id);
      await cargarUsuarios();
    } catch (err) {
      console.error("Error al eliminar usuario", err);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return {
    usuarios,
    loading,
    error,
    refresh: cargarUsuarios,
    eliminarUsuario,
  };
};

