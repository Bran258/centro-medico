import { useEffect, useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import "./UsuarioForm.css";

const initialForm = {
    email: "",
    password: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    dni: "",
    role: "asistente",
};

export default function UsuarioForm({
    usuario,
    saving,
    onCancel,
    onSave,
}) {
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (usuario) {
            setForm({
                email: "",
                password: "",
                nombres: usuario.persona.nombres,
                apellidos: usuario.persona.apellidos,
                telefono: usuario.persona.telefono ?? "",
                dni: usuario.persona.dni ?? "",
                role: usuario.role,
            });
        } else {
            setForm(initialForm);
        }
    }, [usuario]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(form, usuario);
    };

    return (
        <div className="usuario-form">
            <h3>{usuario ? "Editar Usuario" : "Crear Usuario"}</h3>

            <form onSubmit={handleSubmit}>
                {!usuario && (
                    <>
                        <input
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Contraseña"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </>
                )}

                <input
                    name="nombres"
                    placeholder="Nombres"
                    value={form.nombres}
                    onChange={handleChange}
                    required
                />

                <input
                    name="apellidos"
                    placeholder="Apellidos"
                    value={form.apellidos}
                    onChange={handleChange}
                    required
                />

                <input
                    name="dni"
                    placeholder="DNI"
                    value={form.dni}
                    onChange={handleChange}
                />

                <input
                    name="telefono"
                    placeholder="Teléfono"
                    value={form.telefono}
                    onChange={handleChange}
                />

                <select name="role" value={form.role} onChange={handleChange}>
                    <option value="admin">Admin</option>
                    <option value="asistente">Asistente</option>
                </select>

                <div className="usuario-form-actions">
                    <button type="button" onClick={onCancel}>
                        <FaTimes /> Cancelar
                    </button>
                    <button type="submit" disabled={saving}>
                        <FaSave /> Guardar
                    </button>
                </div>
            </form>
        </div>
    );
}
