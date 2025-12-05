import { useState } from "react";
import Contactanos from "../../components/contacto/Contactanos";
import { sendContactMessage } from "../../service/contactService";  // <= AQUÍ

export default function ContactanosView() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [status, setStatus] = useState({ sending: false, ok: null, error: "" });

  const handleChange = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ sending: true, ok: null, error: "" });

    try {
      await sendContactMessage(form);        // <= ENVÍA A SUPABASE

      setStatus({ sending: false, ok: true, error: "" });
      setForm({ nombre: "", email: "", asunto: "", mensaje: "" });

      setTimeout(() => setStatus({ sending: false, ok: null, error: "" }), 3000);

    } catch (error) {
      setStatus({ sending: false, ok: false, error: error.message });
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
