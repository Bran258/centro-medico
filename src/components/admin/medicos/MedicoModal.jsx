import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import api from "@/config/api";
import { createPersona, updatePersona } from "@/service/personas.service";
import { crearMedico, actualizarMedico } from "@/service/medicos.service";
import "./MedicoModal.css";

const initialForm = {
  // PERSONA
  nombres: "",
  apellidos: "",
  telefono: "",
  dni: "",

  // MEDICO
  especialidad_id: "",
  email: "",
  colegiatura: "",
  activo: true,
};

export default function MedicoModal({ open, medico, onClose, onSaved }) {
  const [form, setForm] = useState(initialForm);
  const [especialidades, setEspecialidades] = useState([]);
  const [saving, setSaving] = useState(false);

  const isEdit = Boolean(medico);

  /* ==============================
     CARGAR ESPECIALIDADES
  ============================== */
  useEffect(() => {
    if (!open) return;

    api.get("/api/especialidades")
      .then((res) => setEspecialidades(res.data))
      .catch(() => setEspecialidades([]));
  }, [open]);

  /* ==============================
     CARGAR DATOS SI ES EDICIÓN
  ============================== */
  useEffect(() => {
    if (!open) return;

    if (medico) {
      setForm({
        nombres: medico.persona?.nombres || "",
        apellidos: medico.persona?.apellidos || "",
        telefono: medico.persona?.telefono || "",
        dni: medico.persona?.dni || "",

        especialidad_id: medico.especialidad_id || "",
        email: medico.email || "",
        colegiatura: medico.colegiatura || "",
        activo: medico.activo,
      });
    } else {
      setForm(initialForm);
    }
  }, [open, medico]);

  /* ==============================
     VALIDACIÓN
  ============================== */
  const canSubmit = useMemo(() => {
    if (!form.nombres.trim()) return false;
    if (!form.apellidos.trim()) return false;
    if (!form.especialidad_id) return false;
    if (!form.email.trim()) return false;
    return true;
  }, [form]);

  if (!open) return null;

  /* ==============================
     HANDLERS
  ============================== */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "activo") {
      setForm((p) => ({ ...p, activo: value === "true" }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  };

  /* ==============================
     SUBMIT
  ============================== */
  const handleSubmit = async () => {
    if (!canSubmit || saving) return;

    setSaving(true);

    try {
      if (!isEdit) {
        /* ========= CREAR ========= */

        // 1️⃣ CREAR PERSONA
        const personaResp = await createPersona({
          nombres: form.nombres.trim(),
          apellidos: form.apellidos.trim(),
          telefono: form.telefono?.trim() || null,
          dni: form.dni?.trim() || null,
        });

        const personaId = personaResp?.persona?.id ?? personaResp?.id;

        if (!personaId) {
          throw new Error("No se pudo obtener persona_id");
        }

        // 2️⃣ CREAR MÉDICO
        await crearMedico({
          persona_id: personaId,
          especialidad_id: Number(form.especialidad_id),
          email: form.email.trim(),
          colegiatura: form.colegiatura?.trim() || null,
        });

        await Swal.fire({
          icon: "success",
          title: "Médico creado",
          text: "El médico fue registrado correctamente.",
          timer: 1500,
          showConfirmButton: false,
        });

      } else {
        /* ========= EDITAR ========= */

        await updatePersona(medico.persona_id, {
          nombres: form.nombres.trim(),
          apellidos: form.apellidos.trim(),
          telefono: form.telefono?.trim() || null,
          dni: form.dni?.trim() || null,
        });

        await actualizarMedico(medico.id, {
          especialidad_id: Number(form.especialidad_id),
          email: form.email.trim(),
          colegiatura: form.colegiatura?.trim() || null,
          activo: form.activo,
        });

        await Swal.fire({
          icon: "success",
          title: "Cambios guardados",
          text: "El médico fue actualizado correctamente.",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      onSaved?.();
      onClose?.();

    } catch (e) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text:
          e?.response?.data?.message ||
          e.message ||
          "Error al guardar médico",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3>{isEdit ? "Editar Médico" : "Crear Médico"}</h3>

        <div className="modal-sectionTitle">Datos de Persona</div>

        <input
          name="nombres"
          placeholder="Nombres"
          value={form.nombres}
          onChange={handleChange}
        />

        <input
          name="apellidos"
          placeholder="Apellidos"
          value={form.apellidos}
          onChange={handleChange}
        />

        <input
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
        />

        <input
          name="dni"
          placeholder="DNI"
          value={form.dni}
          onChange={handleChange}
        />

        <div className="modal-sectionTitle">Datos de Médico</div>

        <select
          name="especialidad_id"
          value={form.especialidad_id}
          onChange={handleChange}
        >
          <option value="">Seleccione especialidad</option>
          {especialidades.map((e) => (
            <option key={e.id} value={e.id}>
              {e.nombre}
            </option>
          ))}
        </select>

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="colegiatura"
          placeholder="Colegiatura"
          value={form.colegiatura}
          onChange={handleChange}
        />

        {isEdit && (
          <select
            name="activo"
            value={String(form.activo)}
            onChange={handleChange}
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        )}

        <div className="modal-actions">
          <button onClick={onClose} disabled={saving}>
            Cancelar
          </button>
          <button onClick={handleSubmit} disabled={!canSubmit || saving}>
            {saving ? "Guardando..." : isEdit ? "Guardar" : "Crear"}
          </button>
        </div>
      </div>
    </div>
  );
}
