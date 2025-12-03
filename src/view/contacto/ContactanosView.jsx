import React, { useState } from "react";
import Contactanos from "../../components/contacto/Contactanos.jsx";

export default function ContactanosView() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [status, setStatus] = useState({ sending: false, ok: null, error: "" });

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.email || !form.mensaje) {
      alert("Completa nombre, correo y mensaje.");
      return;
    }

    try {
      setStatus({ sending: true, ok: null, error: "" });

      // Usa tu endpoint de Formspree (configúralo en .env)
      const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("No se pudo enviar el mensaje.");

      setStatus({ sending: false, ok: true, error: "" });
      setForm({ nombre: "", email: "", asunto: "", mensaje: "" });
    } catch (err) {
      setStatus({ sending: false, ok: false, error: err.message });
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