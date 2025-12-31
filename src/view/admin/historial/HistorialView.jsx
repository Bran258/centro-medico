import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { useHistorial } from "@/hooks/historial/useHistorial";
import HistorialCreateModal from "@/components/admin/historial/HistorialCreateModal";

export default function HistorialView() {
  const { historial, loading, error, refresh } = useHistorial();

  // Modal
  const [openModal, setOpenModal] = useState(false);

  const openCreate = () => {
    setOpenModal(true);
  };

  const closeCreate = () => {
    setOpenModal(false);
  };

  if (loading) return <p>Cargando historial...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-page">
      <PageHeader
        title="Historial Clínico"
        subtitle="Registro de atenciones médicas"
      >
        <button
          className="btn btn-primary"
          onClick={openCreate}
        >
          Crear historial
        </button>
      </PageHeader>

      {/* TABLA */}
      {!historial.length ? (
        <p>No hay registros</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Notas</th>
            </tr>
          </thead>

          <tbody>
            {historial.map((h) => (
              <tr key={h.id}>
                <td>{new Date(h.created_at).toLocaleDateString()}</td>

                <td>
                  {h.cita?.cliente
                    ? `${h.cita.cliente.nombres} ${h.cita.cliente.apellidos || ""}`
                    : "—"}
                </td>

                <td>
                  {h.cita?.medico?.persona
                    ? `${h.cita.medico.persona.nombres} ${h.cita.medico.persona.apellidos}`
                    : "—"}
                </td>

                <td>{h.notas || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* MODAL */}
      {openModal && (
        <HistorialCreateModal
          open={openModal}
          onClose={closeCreate}
          onCreated={refresh}
        />
      )}
    </div>
  );
}
