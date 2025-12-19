import React, { useState } from "react";
import PageHeader from "../../../components/ui/PageHeader";
import TableUsuarios from "../../../components/admin/usuarios/TableUsuarios";
import UsuarioForm from "../../../components/admin/usuarios/UsuarioForm";
import { useUsuarios } from "@/hooks/usuarios/useUsuarios";
import { createUsuario, updateUsuario } from "@/service/usuarios.service";
import { createPersona, updatePersona } from "@/service/personas.service";
import api from "@/config/api";
import { FaPlus } from "react-icons/fa";
import "./UsuariosView.css";

const ITEMS_PER_PAGE = 5;

export default function UsuariosView() {
  const { usuarios, loading, error, eliminarUsuario, refresh } = useUsuarios();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [mostrarForm, setMostrarForm] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState(null);
  const [saving, setSaving] = useState(false);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  const usuariosFiltrados = usuarios.filter((u) =>
    `${u.persona.nombres} ${u.persona.apellidos}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const inicio = (page - 1) * ITEMS_PER_PAGE;
  const usuariosPaginados = usuariosFiltrados.slice(
    inicio,
    inicio + ITEMS_PER_PAGE
  );

  const handleCreate = () => {
    setUsuarioEdit(null);
    setMostrarForm(true);
  };

  const handleEdit = (usuario) => {
    setUsuarioEdit(usuario);
    setMostrarForm(true);
  };

  const handleSave = async (form, usuario) => {
    setSaving(true);
    try {
      let authUserId = usuario?.id;

      if (!usuario) {
        const res = await api.post("/api/admin-auth/crear-auth", {
          email: form.email,
          password: form.password,
        });
        authUserId = res.data.auth_user_id;
      }

      if (usuario) {
        await updatePersona(usuario.persona.id, {
          nombres: form.nombres,
          apellidos: form.apellidos,
          telefono: form.telefono,
          dni: form.dni,
        });
        await updateUsuario(usuario.id, { role: form.role });
      } else {
        const personaRes = await createPersona({
          nombres: form.nombres,
          apellidos: form.apellidos,
          telefono: form.telefono,
          dni: form.dni,
        });

        await createUsuario({
          id: authUserId,
          persona_id: personaRes.persona.id,
          role: form.role,
        });
      }

      await refresh();
      setMostrarForm(false);
      setUsuarioEdit(null);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="usuarios">
      <div className="usuarios-header">
        <PageHeader
          title="Gestión de Usuarios"
          subtitle="Administración del sistema"
        />
        <button className="btn-crear" onClick={handleCreate}>
          <FaPlus /> Crear Usuario
        </button>
      </div>

      {mostrarForm && (
        <UsuarioForm
          usuario={usuarioEdit}
          saving={saving}
          onCancel={() => {
            setMostrarForm(false);
            setUsuarioEdit(null);
          }}
          onSave={handleSave}
        />
      )}

      <input
        className="usuarios-search"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableUsuarios
        usuarios={usuariosPaginados}
        onDelete={eliminarUsuario}
        onEdit={handleEdit}
      />
    </div>
  );
}
