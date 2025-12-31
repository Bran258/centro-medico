import { useState } from "react";
import Contactanos from "../../../components/client/contacto/Contactanos.jsx";
import { createClientePublico, sendContacto } from "@/service/contacto.service";

const initialForm = {
  nombres: "",
  apellidos: "",
  telefono: "",
  email: "",
  asunto: "",
  mensaje: "",
};

export default function ContactanosContainer() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({
    sending: false,
    ok: null,
    error: null,
  });

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      setStatus({ sending: true, ok: null, error: null });

      // 1️⃣ Crear cliente público
      const cliente = await createClientePublico({
        nombres: form.nombres,
        apellidos: form.apellidos,
        email: form.email,
        telefono: form.telefono,
      });

      // 2️⃣ Crear contacto
      await sendContacto({
        cliente_id: cliente.id,
        asunto: form.asunto,
        mensaje: form.mensaje,
      });

      setStatus({ sending: false, ok: true, error: null });
      setForm(initialForm);
    } catch (err) {
      setStatus({
        sending: false,
        ok: false,
        error: err?.response?.data?.message || "Error al enviar mensaje",
      });
    }
  };

  return (
    <Contactanos
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      status={status}
    />
  );
}
