// src/components/admin/citas/Citas.jsx
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { listarMedicos } from "@/service/medicos.service";
import "./Citas.css";

export default function Citas({
  citas,
  confirmar,
  cancelar,
  atender,
}) {
  const [medicos, setMedicos] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [citaSel, setCitaSel] = useState(null);
  const [medicoId, setMedicoId] = useState("");

  useEffect(() => {
    listarMedicos().then(setMedicos);
  }, []);

  const abrirPanel = (cita) => {
    setCitaSel(cita);
    setMedicoId(cita.medico?.id || "");
    setShowPanel(true);
  };

  const cerrarPanel = () => {
    setShowPanel(false);
    setCitaSel(null);
    setMedicoId("");
  };

  const confirmarAsignacion = async () => {
    if (!medicoId) {
      Swal.fire("Selecciona un médico");
      return;
    }

    await confirmar(citaSel.id, {
      medico_id: Number(medicoId),
      fecha_confirmada: citaSel.fecha_solicitada,
      hora_confirmada: citaSel.hora_solicitada,
    });

    cerrarPanel();
  };

  const formatFecha = (f) =>
    f ? new Date(f).toLocaleDateString("es-PE") : "—";

  const formatHora = (h) =>
    h
      ? new Date(h).toLocaleTimeString("es-PE", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "—";

  return (
    <>
      <table className="citas-table">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Síntomas</th>
            <th>Médico</th>
            <th>Especialidad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.cliente.nombres} {cita.cliente.apellidos || ""}</td>
              <td>{cita.cliente.telefono || "—"}</td>
              <td>{cita.cliente.email || "—"}</td>
              <td>{formatFecha(cita.fecha_solicitada)}</td>
              <td>{formatHora(cita.hora_solicitada)}</td>
              <td>{cita.sintomas || "—"}</td>

              <td>
                {cita.medico
                  ? `${cita.medico.persona.nombres} ${cita.medico.persona.apellidos}`
                  : "Sin asignar"}
              </td>

              <td>
                {cita.medico
                  ? cita.medico.especialidad.nombre
                  : "—"}
              </td>

              <td>
                <span className={`badge badge-${cita.estado}`}>
                  {cita.estado}
                </span>
              </td>

              <td className="acciones">
                {(cita.estado === "pendiente" ||
                  cita.estado === "confirmada") && (
                  <button
                    className="btn primary"
                    onClick={() => abrirPanel(cita)}
                  >
                    {cita.medico ? "Editar" : "Confirmar"}
                  </button>
                )}

                {cita.estado === "confirmada" && (
                  <button
                    className="btn success"
                    onClick={() => atender(cita.id)}
                  >
                    Atendida
                  </button>
                )}

                {cita.estado !== "cancelada" &&
                  cita.estado !== "atendida" && (
                    <button
                      className="btn warning"
                      onClick={() => cancelar(cita.id)}
                    >
                      Cancelar
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PANEL ASIGNAR MÉDICO */}
      {showPanel && (
        <div className="panel-backdrop">
          <div className="panel-card">
            <h4>Asignar médico</h4>

            <select
              value={medicoId}
              onChange={(e) => setMedicoId(e.target.value)}
            >
              <option value="">Seleccionar médico</option>
              {medicos.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.persona.nombres} {m.persona.apellidos} –{" "}
                  {m.especialidad.nombre}
                </option>
              ))}
            </select>

            <div className="panel-actions">
              <button className="btn success" onClick={confirmarAsignacion}>
                Guardar
              </button>
              <button className="btn secondary" onClick={cerrarPanel}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
