import "../../styles/reservarCita/ResumenCita.css";
import Swal from "sweetalert2";
import { registrarCita } from "../../service/citasService";

export default function ResumenCita({ paciente, telefono, sintomas, fecha, hora, tipoCita }) {

  const guardarCita = async () => {

    // VALIDACIÓN CAMPOS VACÍOS
    if (!paciente || !telefono || !sintomas || !fecha || !hora) {
      Swal.fire({ icon: "warning", title: "Campos incompletos", text: "Completa todos los campos antes de registrar la cita." });
      return;
    }

    // VALIDACIÓN DEL TELÉFONO (9 dígitos)
    if (telefono.length !== 9) {
      Swal.fire({ icon: "warning", title: "Número inválido", text: "El número de celular debe tener 9 dígitos." });
      return;
    }

    try {
      await registrarCita({ paciente, telefono, sintomas, fecha, hora, tipoCita });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo guardar la cita." });
      console.error(error);
      return;
    }

    // MENSAJE PARA WHATSAPP
    const fechaISO = fecha.toISOString().split("T")[0];
    const mensaje = encodeURIComponent(
      `*Nueva solicitud de cita médica*

      *Datos del paciente*
      • *Nombre:* ${paciente}
      • *Tipo de atención:* ${tipoCita === "adulto" ? "Paciente adulto" : "Paciente menor de edad"}
      • *Teléfono:* ${telefono}

      *Detalles de la cita*
      • *Fecha:* ${fechaISO}
      • *Hora:* ${hora}

      *Motivo de consulta / Síntomas*
      ${sintomas}

      Favor de confirmar disponibilidad o coordinar cualquier indicación adicional.`
    );

    const numeroDestino = import.meta.env.VITE_WHATSAPP_NUMERO;

    Swal.fire({ icon: "success", title: "Cita registrada", text: "Tu cita ha sido registrada correctamente." })
      .then(() => {
        window.open(`https://wa.me/${numeroDestino}?text=${mensaje}`, "_blank");
        window.location.reload();
      });
  };


  return (
    <div className="card resumen-card">
      <h2 className="resumen-title">Resumen de tu Cita</h2>

      <div className="d-flex flex-column gap-3 resumen-info">

        <div className="d-flex justify-content-between">
          <span className="label-muted">Paciente:</span>
          <span className="label-strong">{paciente || "—"}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span className="label-muted">Tipo de Cita:</span>
          <span className="label-strong">
            {tipoCita === "adulto" ? "Para mí" : "Para un menor"}
          </span>
        </div>

        <div className="d-flex justify-content-between">
          <span className="label-muted">Teléfono:</span>
          <span className="label-strong">{telefono || "—"}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span className="label-muted">Fecha:</span>
          <span className="label-strong">
            {fecha ? fecha.toDateString() : "—"}
          </span>
        </div>

        <div className="d-flex justify-content-between">
          <span className="label-muted">Hora:</span>
          <span className="label-strong">{hora || "—"}</span>
        </div>

        <div>
          <span className="label-muted">Síntomas:</span>
          <p className="label-strong mt-1">{sintomas || "—"}</p>
        </div>

      </div>

      <hr className="my-4" />

      <button className="btn btn-primary btn-confirm w-100"
        onClick={guardarCita}>
        Confirmar Cita
      </button>

    </div>
  );
}
