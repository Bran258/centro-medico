import "@/styles/client/reservarCita/ResumenCita.css";
import Swal from "sweetalert2";
import { crearCita } from "../../../service/citas.service";
import { useState } from "react";

export default function ResumenCita({
  nombres,
  apellidos,
  email,
  telefono,
  sintomas,
  fecha,
  hora,
  tipoCita,
}) {
  const [saving, setSaving] = useState(false);

  const guardarCita = async () => {
    if (saving) return;

    // VALIDACIONES BÁSICAS
    if (!nombres || !telefono || !sintomas || !fecha || !hora) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Completa todos los campos obligatorios.",
      });
      return;
    }

    if (telefono.length !== 9) {
      Swal.fire({
        icon: "warning",
        title: "Número inválido",
        text: "El número de celular debe tener 9 dígitos.",
      });
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Swal.fire({
        icon: "warning",
        title: "Correo inválido",
        text: "Ingresa un correo electrónico válido.",
      });
      return;
    }

    if (!(fecha instanceof Date)) {
      Swal.fire({
        icon: "error",
        title: "Fecha inválida",
        text: "Selecciona una fecha válida.",
      });
      return;
    }

    const fechaISO = fecha.toISOString().split("T")[0];

    setSaving(true);

    try {
      await crearCita({
        nombres: nombres.trim(),
        apellidos: apellidos?.trim() || null,
        email: email?.trim() || null,
        telefono,
        fecha_solicitada: fechaISO,
        hora_solicitada: hora,
        sintomas: sintomas.trim(),
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al registrar",
        text:
          error.response?.data?.message ||
          "No se pudo registrar la cita.",
      });
      console.error(error);
      setSaving(false);
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Cita registrada",
      text: "Tu cita fue registrada correctamente.",
      confirmButtonText: "Aceptar",
    }).then(() => window.location.reload());
  };

  return (
    <div className="card resumen-card">
      <h2 className="resumen-title">Resumen de tu Cita</h2>

      <div className="d-flex flex-column gap-3 resumen-info">
        <div className="d-flex justify-content-between">
          <span>Paciente:</span>
          <span>{`${nombres} ${apellidos || ""}`}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span>Correo:</span>
          <span>{email || "—"}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span>Tipo:</span>
          <span>{tipoCita === "adulto" ? "Adulto" : "Menor"}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span>Teléfono:</span>
          <span>{telefono}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span>Fecha:</span>
          <span>{fecha ? fecha.toDateString() : "—"}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span>Hora:</span>
          <span>{hora}</span>
        </div>

        <div>
          <span>Síntomas:</span>
          <p>{sintomas}</p>
        </div>
      </div>

      <hr />

      <button
        className="btn btn-primary w-100"
        onClick={guardarCita}
        disabled={saving}
      >
        {saving ? "Guardando..." : "Confirmar Cita"}
      </button>
    </div>
  );
}

