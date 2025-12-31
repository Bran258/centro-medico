import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { buscarCitasPorPaciente } from "@/service/citas.service";
import { createHistorial } from "@/service/historial.service";
import "./HistorialCreateModal.css";

export default function HistorialCreateModal({ open, onClose, onCreated }) {
  const [search, setSearch] = useState("");
  const [citas, setCitas] = useState([]);
  const [selectedCita, setSelectedCita] = useState(null);
  const [notas, setNotas] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  useEffect(() => {
    const run = async () => {
      if (search.trim().length < 3) {
        setCitas([]);
        return;
      }
      try {
        setLoading(true);
        const data = await buscarCitasPorPaciente(search);
        setCitas(data);
      } catch {
        setCitas([]);
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [search]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!selectedCita) {
      Swal.fire("Atención", "Seleccione una cita", "warning");
      return;
    }

    if (!notas.trim()) {
      Swal.fire("Atención", "Ingrese notas clínicas", "warning");
      return;
    }

    try {
      setSaving(true);
      await createHistorial({
        cita_id: selectedCita.id,
        notas,
      });

      Swal.fire("Éxito", "Historial registrado", "success");
      onCreated?.();
      onClose?.();
    } catch (err) {
      Swal.fire(
        "Error",
        err?.response?.data?.message || "No se pudo registrar",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="hcm-overlay" onClick={onClose}>
      <div className="hcm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="hcm-head">
          <h3>Registrar Historial Clínico</h3>
          <button className="hcm-close" onClick={onClose}>×</button>
        </div>

        <div className="hcm-body">
          {/* BUSCADOR */}
          <label className="hcm-label">Buscar paciente</label>
          <input
            className="hcm-input"
            placeholder="Ej: Juan, Perez"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {loading && <p className="hcm-muted">Buscando...</p>}

          {/* RESULTADOS */}
          {citas.length > 0 && (
            <ul className="hcm-list">
              {citas.map((c) => (
                <li
                  key={c.id}
                  className={
                    selectedCita?.id === c.id
                      ? "hcm-item selected"
                      : "hcm-item"
                  }
                  onClick={() => setSelectedCita(c)}
                >
                  <b>
                    {c.cliente.nombres} {c.cliente.apellidos || ""}
                  </b>
                  <span>
                    {c.fecha_confirmada
                      ? new Date(c.fecha_confirmada).toLocaleDateString()
                      : "Sin confirmar"}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* CITA SELECCIONADA */}
          {selectedCita && (
            <p className="hcm-info">
              <b>Cita ID:</b> {selectedCita.id}
            </p>
          )}

          {/* NOTAS */}
          <form onSubmit={handleSave}>
            <label className="hcm-label">Notas clínicas</label>
            <textarea
              className="hcm-textarea"
              rows="5"
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Ej: Paciente estable..."
            />

            <div className="hcm-actions">
              <button type="button" className="btn btn-ghost" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving ? "Guardando..." : "Guardar historial"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
