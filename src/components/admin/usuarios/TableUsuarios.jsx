import "./TableUsuarios.css";
import Swal from "sweetalert2";
import { FaTrash, FaUserShield, FaUser, FaEdit } from "react-icons/fa";

const TableUsuarios = ({ usuarios, onDelete, onEdit }) => {
  const handleDelete = (id, nombre) => {
    Swal.fire({
      title: "¿Eliminar usuario?",
      text: `Se eliminará a ${nombre}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
    }).then((res) => {
      if (res.isConfirmed) {
        onDelete(id);
        Swal.fire("Eliminado", "Usuario eliminado.", "success");
      }
    });
  };

  return (
    <div className="tabla-wrapper">
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>DNI</th>
            <th>Celular</th>
            <th>Rol</th>
            <th style={{ textAlign: "center" }}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.persona.nombres}</td>
              <td>{u.persona.apellidos}</td>
              <td>{u.persona.dni || "-"}</td>
              <td>{u.persona.telefono || "-"}</td>

              <td>
                <span className={`rol-badge ${u.role}`}>
                  {u.role === "admin" ? <FaUserShield /> : <FaUser />}
                  {u.role.toUpperCase()}
                </span>
              </td>

              <td className="acciones-center">
                {onEdit && (
                  <button
                    className="btn-icon btn-edit"
                    onClick={() => onEdit(u)}
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                )}

                <button
                  className="btn-icon btn-delete"
                  onClick={() =>
                    handleDelete(
                      u.id,
                      `${u.persona.nombres} ${u.persona.apellidos}`
                    )
                  }
                  title="Eliminar"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsuarios;
