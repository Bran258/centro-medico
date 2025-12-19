import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  createEspecialidad,
  updateEspecialidad,
} from "@/service/especialidades.service";
import "./EspecialidadModal.css";

export default function EspecialidadModal({
  open,
  onClose,
  especialidad,
  onSaved,
}) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const isEdit = Boolean(especialidad);

  useEffect(() => {
    if (especialidad) {
      setNombre(especialidad.nombre);
      setDescripcion(especialidad.descripcion || "");
    } else {
      setNombre("");
      setDescripcion("");
    }
  }, [especialidad]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      Swal.fire("Error", "El nombre es obligatorio", "warning");
      return;
    }

    try {
      if (isEdit) {
        await updateEspecialidad(especialidad.id, {
          nombre,
          descripcion,
        });
      } else {
        await createEspecialidad({ nombre, descripcion });
      }

      Swal.fire({
        icon: "success",
        title: isEdit
          ? "Especialidad actualizada"
          : "Especialidad creada",
        timer: 1600,
        showConfirmButton: false,
      });

      onSaved();
      onClose();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "No se pudo guardar",
        "error"
      );
    }
  };

  return (
    <div className="esp-modal-overlay">
      <div className="esp-modal">
        <h3>{isEdit ? "Editar Especialidad" : "Crear Especialidad"}</h3>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <div className="esp-modal-actions">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">
              {isEdit ? "Guardar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
