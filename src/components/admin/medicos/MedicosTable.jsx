import { useMemo, useState } from "react";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useMedicos } from "@/hooks/medicos/useMedicos";
import "./MedicosTable.css";

const PAGE = 5;

export default function MedicosTable({ onEdit, reload }) {
  const { medicos, especialidades, loading, error, desactivar } =
    useMedicos(reload);

  const [search, setSearch] = useState("");
  const [esp, setEsp] = useState("Todas");
  const [page, setPage] = useState(1);

  // Filtro
  const filtrados = useMemo(() => {
    const q = search.toLowerCase();
    return medicos.filter((m) => {
      const nombre = `${m.persona?.nombres || ""} ${m.persona?.apellidos || ""}`
        .toLowerCase();
      return (
        (!q || nombre.includes(q)) &&
        (esp === "Todas" || m.especialidad?.nombre === esp)
      );
    });
  }, [medicos, search, esp]);

  // Paginación
  const total = filtrados.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE));
  const currentPage = Math.min(page, totalPages);
  const items = filtrados.slice(
    (currentPage - 1) * PAGE,
    currentPage * PAGE
  );

  // ✅ DESACTIVAR con SweetAlert2
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Desactivar médico?",
      text: "El médico no podrá ser asignado a nuevas citas.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      await desactivar(id);

      await Swal.fire({
        icon: "success",
        title: "Médico desactivado",
        text: "El médico fue desactivado correctamente.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          e?.response?.data?.message ||
          "No se pudo desactivar el médico",
      });
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-wrap">
      {/* Filtros */}
      <div className="mt-filters">
        <input
          placeholder="Buscar..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          value={esp}
          onChange={(e) => {
            setPage(1);
            setEsp(e.target.value);
          }}
        >
          {especialidades.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla */}
      <table className="mt-table">
        <thead>
          <tr>
            <th>Médico</th>
            <th>Especialidad</th>
            <th>Email</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: 16 }}>
                No hay resultados
              </td>
            </tr>
          ) : (
            items.map((m) => (
              <tr key={m.id}>
                <td>
                  {m.persona?.nombres} {m.persona?.apellidos}
                </td>
                <td>{m.especialidad?.nombre || "--"}</td>
                <td>{m.email}</td>
                <td>
                  <span
                    className={`mt-status ${
                      m.activo ? "mt-status--ok" : "mt-status--off"
                    }`}
                  >
                    {m.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td>
                  <FaEdit
                    className="mt-btn-edit"
                    title="Editar"
                    onClick={() => onEdit?.(m)}
                  />
                  <FaTrash
                    className="mt-btn-delete"
                    title="Desactivar"
                    onClick={() => handleDelete(m.id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Footer */}
      <div className="mt-footer">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

