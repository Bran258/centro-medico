// hooks/useReservaCita.js
import { useState } from "react";
import Swal from "sweetalert2";

export default function useReservaCita() {
  const [datos, setDatos] = useState({
    nombre: "",
    especialidad: "",
    horaSeleccionada: "",
    fechaSeleccionada: null, // empieza sin selección
    horarios: [
      { value: "09:00 AM", disabled: true },
      { value: "09:30 AM" },
      { value: "10:00 AM" },
      { value: "10:30 AM" },
      { value: "11:00 AM" },
      { value: "11:30 AM" },
      { value: "01:00 PM" },
      { value: "01:30 PM" },
      { value: "02:00 PM" },
      { value: "02:30 PM", disabled: true },
      { value: "03:00 PM" },
      { value: "03:30 PM" },
      { value: "04:00 PM" },
      { value: "04:30 PM" },
      { value: "05:00 PM" },
      { value: "05:30 PM" },
      { value: "06:00 PM" },
      { value: "06:30 PM" },
    ],
  });

  const handleChange = (field, value) => {
    setDatos((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = () => {
    const { nombre, especialidad, horaSeleccionada, fechaSeleccionada } = datos;

    if (!nombre || !especialidad || !horaSeleccionada || !fechaSeleccionada) {
      Swal.fire({
        icon: "warning",
        title: "Faltan datos",
        text: "Por favor completa todos los campos antes de confirmar.",
        confirmButtonColor: "#4a90e2",
      });
      return;
    }

    const fechaFormateada = fechaSeleccionada.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    Swal.fire({
      icon: "success",
      title: "Cita confirmada",
      html: `
        <div style="text-align:left;">
          <p><strong>👤 Nombre:</strong> ${nombre}</p>
          <p><strong>🩺 Tipo de atención:</strong> ${especialidad}</p>
          <p><strong>📅 Fecha:</strong> ${fechaFormateada}</p>
          <p><strong>🕒 Hora:</strong> ${horaSeleccionada}</p>
        </div>
      `,
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#4a90e2",
    });

    console.log("✅ Datos de la cita:", datos);
  };

  return { datos, handleChange, handleConfirm };
}
