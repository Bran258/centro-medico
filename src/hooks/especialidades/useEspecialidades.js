import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getEspecialidades,
  deleteEspecialidad,
} from "@/service/especialidades.service";

export const useEspecialidades = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEspecialidades = async () => {
    setLoading(true);
    const res = await getEspecialidades();
    setEspecialidades(res.data);
    setLoading(false);
  };

  const eliminar = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: "¿Eliminar especialidad?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (!confirm.isConfirmed) return;

      await deleteEspecialidad(id);

      Swal.fire({
        icon: "success",
        title: "Eliminada",
        text: "La especialidad fue eliminada correctamente",
        timer: 1800,
        showConfirmButton: false,
      });

      fetchEspecialidades();
    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire(
          "No se puede eliminar",
          "Esta especialidad está vinculada a uno o más médicos",
          "error"
        );
        return;
      }

      Swal.fire(
        "Error",
        error.response?.data?.message || "Ocurrió un error",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  return {
    especialidades,
    loading,
    eliminar,
    fetchEspecialidades,
  };
};
