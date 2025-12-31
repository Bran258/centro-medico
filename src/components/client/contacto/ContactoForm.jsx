import { useState } from "react";
import Swal from "sweetalert2";
import {
    createClientePublico,
    sendContacto,
} from "@/service/contacto.service";
import "@/styles/client/contacto/ContactoForm.css";

const initialForm = {
    nombres: "",
    apellidos: "",
    telefono: "",
    email: "",
    asunto: "",
    mensaje: "",
};

export default function ContactoForm() {
    const [form, setForm] = useState(initialForm);
    const [sending, setSending] = useState(false);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (sending) return;

        if (!form.nombres || !form.asunto || !form.mensaje) {
            Swal.fire("Error", "Complete los campos obligatorios", "error");
            return;
        }

        try {
            setSending(true);

            // 1️⃣ Cliente público
            const cliente = await createClientePublico({
                nombres: form.nombres,
                apellidos: form.apellidos || null,
                telefono: form.telefono || null,
                email: form.email || null,
            });

            if (!cliente?.id) {
                throw new Error("Cliente no creado");
            }

            // 2️⃣ Contacto
            await sendContacto({
                cliente_id: cliente.id,
                asunto: form.asunto,
                mensaje: form.mensaje,
            });

            Swal.fire("Enviado", "Mensaje enviado correctamente", "success");
            setForm(initialForm);
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "No se pudo enviar el mensaje", "error");
        } finally {
            setSending(false);
        }
    };


    return (
        <form className="contacto-form" onSubmit={handleSubmit}>
            <div className="grid">
                <input
                    name="nombres"
                    placeholder="Nombres *"
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
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />
            </div>

            <input
                name="asunto"
                placeholder="Asunto *"
                value={form.asunto}
                onChange={handleChange}
            />

            <textarea
                name="mensaje"
                placeholder="Mensaje *"
                rows={4}
                value={form.mensaje}
                onChange={handleChange}
            />

            <button type="submit" disabled={sending}>
                {sending ? "Enviando..." : "Enviar mensaje"}
            </button>
        </form>
    );
}
