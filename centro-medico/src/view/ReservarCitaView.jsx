import React, { useState } from "react";
import ReservaCita from "../components/ReservaCita";

export default function ReservarCitaView() {
  const [datos, setDatos] = useState({
    nombre: "",
    especialidad: "",
    horaSeleccionada: "",
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
    mesActual: "Octubre 2025",
    fechas: Array.from({ length: 31 }, (_, i) => ({
      value: i + 1,
      disabled: false, // 🔹 Corregido: antes ponías "disabled: i + 10", lo cual era incorrecto
      selected: false,
    })),
  });

  // Maneja cambios de formulario
  const handleChange = (field, value) => {
    // 🔹 Navegación de meses (por ahora solo simula el cambio)
    if (field === "mesAnterior") {
      setDatos((prev) => ({ ...prev, mesActual: "Septiembre 2025" }));
      return;
    }
    if (field === "mesSiguiente") {
      setDatos((prev) => ({ ...prev, mesActual: "Noviembre 2025" }));
      return;
    }

    // 🔹 Seleccionar fecha
    if (field === "fechaSeleccionada") {
      setDatos((prev) => ({
        ...prev,
        fechas: prev.fechas.map((f) => ({
          ...f,
          selected: f.value === value,
        })),
      }));
      return;
    }

    // 🔹 Seleccionar hora o campos de texto
    setDatos((prev) => ({ ...prev, [field]: value }));
  };

  // Confirmar cita
  const handleConfirm = () => {
    if (!datos.nombre || !datos.especialidad || !datos.horaSeleccionada) {
      alert("Por favor completa todos los campos antes de confirmar.");
      return;
    }
    const fechaSeleccionada = datos.fechas.find((f) => f.selected)?.value;
    alert(
      `✅ Cita confirmada:\n\n👤 Nombre: ${datos.nombre}\n🩺 Especialidad: ${datos.especialidad}\n📅 Fecha: ${fechaSeleccionada || "No seleccionada"} de ${datos.mesActual}\n🕒 Hora: ${datos.horaSeleccionada}`
    );
    console.log("Datos de la cita:", datos);
  };

  return (
    <ReservaCita
      datos={datos}
      onChange={handleChange}
      onConfirm={handleConfirm}
    />
  );
}

