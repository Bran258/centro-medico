
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  listarCitas,
  confirmarCita,
  cancelarCita,
  atenderCita,
  eliminarCita,
} from "@/service/citas.service";

export const useCitas = () => {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCitas = async () => {
    setLoading(true);
    const data = await listarCitas();
    setCitas(data);
    setLoading(false);
  };

  const confirmar = async (id, payload) => {
    await confirmarCita(id, payload);
    fetchCitas();
  };

  const cancelar = async (id) => {
    const res = await Swal.fire({
      title: "¿Cancelar cita?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
    });

    if (!res.isConfirmed) return;
    await cancelarCita(id);
    fetchCitas();
  };

  const atender = async (id) => {
    const res = await Swal.fire({
      title: "¿Marcar como atendida?",
      text: "Esta acción no se puede deshacer",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, marcar",
    });

    if (!res.isConfirmed) return;
    await atenderCita(id);
    fetchCitas();
  };

  const eliminar = async (id) => {
    const res = await Swal.fire({
      title: "¿Eliminar cita?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
    });

    if (!res.isConfirmed) return;
    await eliminarCita(id);
    fetchCitas();
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  return {
    citas,
    loading,
    confirmar,
    cancelar,
    atender,
    eliminar,
  };
};
