import "./Especialidades.css";
import { useState } from "react";
import { FaEdit, FaTrash, FaSearch, FaPlus } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { useEspecialidades } from "@/hooks/especialidades/useEspecialidades";
import EspecialidadModal from "./EspecialidadModal";

export default function Especialidades() {
  const {
    especialidades,
    loading,
    eliminar,
    fetchEspecialidades,
  } = useEspecialidades();

  const [openModal, setOpenModal] = useState(false);
  const [editEsp, setEditEsp] = useState(null);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="esp-container">
      <div className="esp-summary">
        <div className="esp-card">
          <div>
            <p className="esp-card-label">Total Especialidades</p>
            <p className="esp-card-value">{especialidades.length}</p>
          </div>
          <div className="esp-card-icon">
            <MdCategory />
          </div>
        </div>

        <button
          className="especialidades-createBtn"
          onClick={() => {
            setEditEsp(null);
            setOpenModal(true);
          }}
        >
          <FaPlus /> Crear Especialidad
        </button>
      </div>
      <div className="esp-table-card">
        <div className="esp-table-header">
          <div className="esp-search">
            <FaSearch />
            <input placeholder="Buscar especialidad..." />
          </div>
        </div>

        <div className="esp-table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th className="right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {especialidades.map((e, index) => (
                <tr key={e.id}>
                  <td className="mono">{index + 1}</td>
                  <td>{e.nombre}</td>
                  <td className="truncate">{e.descripcion || "-"}</td>
                  <td className="right">
                    <button
                      className="edit"
                      onClick={() => {
                        setEditEsp(e);
                        setOpenModal(true);
                      }}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="delete"
                      onClick={() => eliminar(e.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <EspecialidadModal
        open={openModal}
        especialidad={editEsp}
        onClose={() => setOpenModal(false)}
        onSaved={fetchEspecialidades}
      />
    </div>
  );
}
