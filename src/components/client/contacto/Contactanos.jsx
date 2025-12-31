
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import "../../../styles/client/contacto/ContactoView.css";

const LAT = -12.599305;
const LNG = -69.182861;
const MAP = `https://www.google.com/maps?q=${LAT},${LNG}&z=16&output=embed`;

const ADDRESS = "Av. Carlos Fermin Fitzcarrald 252, Puerto Maldonado 17001";
const PHONE_INFO = "+51 912 342 342";
const PHONE_URG = "(01) 523 5900";

const WA_NUMBER = "51912342342"; // sin +, con código país
const WA_LINK = `https://wa.me/${WA_NUMBER}`;
const TEL_INFO_LINK = `tel:+${WA_NUMBER}`;
const TEL_URG_LINK = `tel:${PHONE_URG.replace(/[^\d]/g, "")}`;
const DIR_LINK = `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`;

export default function Contactanos({ form, onChange, onSubmit, status }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const vacios = [];
    if (!form.nombres?.trim()) vacios.push("Nombres");
    if (!form.apellidos?.trim()) vacios.push("Apellidos");
    if (!form.email?.trim()) vacios.push("Correo electrónico");
    if (!form.asunto?.trim()) vacios.push("Motivo de contacto");
    if (!form.mensaje?.trim()) vacios.push("Observaciones");

    if (vacios.length > 0) {
      await Swal.fire({
        title: "Campos incompletos",
        html: `
          Completa todos los campos obligatorios antes de enviar.<br/><br/>
          <b>Faltan:</b> ${vacios.join(", ")}
        `,
        icon: "warning",
        confirmButtonText: "Entendido",
      });
      return;
    }

    onSubmit(e);
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Dirección copiada",
        showConfirmButton: false,
        timer: 1400,
        timerProgressBar: true,
      });
    } catch {
      // fallback simple
      try {
        const temp = document.createElement("textarea");
        temp.value = ADDRESS;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Dirección copiada",
          showConfirmButton: false,
          timer: 1400,
          timerProgressBar: true,
        });
      } catch {
        Swal.fire({
          icon: "error",
          title: "No se pudo copiar",
          text: "Tu navegador bloqueó el copiado. Copia manualmente la dirección.",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  useEffect(() => {
    if (status.sending) {
      Swal.fire({
        title: "Enviando mensaje...",
        text: "Por favor espera mientras procesamos tu solicitud.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => Swal.showLoading(),
      });
      return;
    }

    Swal.close();

    if (status.ok === true) {
      Swal.fire({
        title: "Mensaje enviado",
        text: "Tu mensaje fue enviado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    }

    if (status.ok === false) {
      Swal.fire({
        title: "Error al enviar",
        text: status.error || "Ocurrió un error al enviar tu mensaje.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  }, [status.sending, status.ok, status.error]);

  return (
    <main className="contact-page">
      {/* HERO */}
      <section className="contact-hero">
        <div className="container contact-hero-inner">
          <h1 className="contact-hero-title">Contáctenos</h1>
          <p className="contact-hero-breadcrumb">
            Inicio - <span>Contáctenos</span>
          </p>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <section className="container contact-main">
        <div className="contact-grid">
          {/* IZQUIERDA: FORM */}
          <section className="panel panel-contact-main">
            <div className="contact-intro">
              <h2>Para cualquier duda o consulta:</h2>
              <p>Si quieres contactarte con nosotros, llena el siguiente formulario.</p>
              <p className="contact-form-note">(*) Campos obligatorios.</p>
            </div>

            <div className="contact-form-layout">
              {/* FOTO */}
              <div className="contact-photo-col">
                <img
                  src="https://media.istockphoto.com/id/1506195498/es/foto/paciente-llenando-el-formulario-con-su-hija.jpg?s=170667a&w=0&k=20&c=pIEX0FXq0R7b6m4FXp3l6Wznz0T9PUlfE__yZaftwb0="
                  alt="Paciente llenando el formulario con su hija"
                />
              </div>

              {/* FORMULARIO */}
              <div className="contact-form-col">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <p>
                      <label>Nombres(*)</label>
                      <input
                        name="nombres"
                        value={form.nombres}
                        onChange={(e) => onChange("nombres", e.target.value)}
                        required
                        placeholder="Ej: Pedro Pablo"
                        autoComplete="given-name"
                      />
                    </p>

                    <p>
                      <label>Apellidos(*)</label>
                      <input
                        name="apellidos"
                        value={form.apellidos}
                        onChange={(e) => onChange("apellidos", e.target.value)}
                        required
                        placeholder="Ej: Perez Gomez"
                        autoComplete="family-name"
                      />
                    </p>
                  </div>

                  <div className="row">
                    <p>
                      <label>Correo(*)</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={(e) => onChange("email", e.target.value)}
                        required
                        placeholder="Ej: correo@gmail.com"
                        autoComplete="email"
                      />
                    </p>

                    <p>
                      <label>Celular</label>
                      <input
                        name="telefono"
                        value={form.telefono}
                        onChange={(e) => onChange("telefono", e.target.value)}
                        placeholder="Ej: 912 345 678"
                        inputMode="tel"
                        autoComplete="tel"
                      />
                    </p>
                  </div>

                  <p>
                    <label>Asunto(*)</label>
                    <input
                      name="asunto"
                      value={form.asunto}
                      onChange={(e) => onChange("asunto", e.target.value)}
                      required
                      placeholder="Ej: Reservar cita / Resultados / Consultas"
                    />
                  </p>

                  <p>
                    <label>Observaciones(*)</label>
                    <textarea
                      name="mensaje"
                      rows="6"
                      value={form.mensaje}
                      onChange={(e) => onChange("mensaje", e.target.value)}
                      required
                      placeholder="Ej: Buen día, deseo información sobre..."
                    />
                  </p>

                  <button type="submit" className="btn" disabled={status.sending}>
                    {status.sending ? "Enviando..." : "Enviar"}
                  </button>
                </form>
              </div>
            </div>

            {/* FAQ: NO SE BORRA */}
            <section className="contact-faq">
              <div className="panel contact-faq-panel">
                <h3>Preguntas frecuentes</h3>

                <details className="faq-item">
                  <summary>¿En cuánto tiempo responden?</summary>
                  <p>Respondemos en un plazo aproximado de 24 horas hábiles.</p>
                </details>

                <details className="faq-item">
                  <summary>¿Puedo reservar por WhatsApp?</summary>
                  <p>Sí, puedes escribirnos y te ayudamos con tu reserva.</p>
                </details>

                <details className="faq-item">
                  <summary>¿Dónde queda el centro médico?</summary>
                  <p>Estamos en {ADDRESS}.</p>
                </details>
              </div>
            </section>
          </section>

          {/* DERECHA: INFO (orden como pediste) */}
          <aside className="panel panel-location">
            <img
              className="location-photo"
              src="https://images.pexels.com/photos/3279207/pexels-photo-3279207.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Fachada del Centro Médico Santa Rosa"
            />

            {/* 1) HORARIO PRIMERO */}
            <div className="location-meta location-meta--top">
              <div className="meta-card">
                <h4>Horario de atención</h4>
                <p>
                  <b>Lun–Vie:</b> 8:00 am – 6:00 pm
                </p>
                <p>
                  <b>Sáb:</b> 8:00 am – 13:00
                </p>
              </div>
            </div>

            {/* 2) BOTONES (solo WhatsApp + Llamar) */}
            <div className="location-actions location-actions--top">
              <a className="qa qa--primary" href={WA_LINK} target="_blank" rel="noreferrer">
                💬 WhatsApp
              </a>

              <a className="qa qa--ghost" href={TEL_INFO_LINK}>
                📞 Llamar
              </a>
            </div>

            {/* 3) DIRECCIÓN / INFORMES / URGENCIAS */}
            <div className="contact-info-box">
              <div className="location-item">
                <div className="location-icon">🏥</div>
                <div>
                  <h3>Dirección</h3>
                  <p>
                    Av. Carlos Fermin Fitzcarrald 252,
                    <br />
                    Puerto Maldonado 17001
                  </p>
                </div>
              </div>

              <div className="location-item">
                <div className="location-icon">📞</div>
                <div>
                  <h3>Informes</h3>
                  <p>
                    <a href={TEL_INFO_LINK}>{PHONE_INFO}</a>
                  </p>
                </div>
              </div>

              <div className="location-item">
                <div className="location-icon">➕</div>
                <div>
                  <h3>Urgencias</h3>
                  <p>
                    <a href={TEL_URG_LINK}>{PHONE_URG}</a>
                  </p>
                </div>
              </div>
            </div>

            {/* 4) BADGE AL FINAL */}
            <div className="meta-badge">⏱ Respondemos en 24h hábiles</div>
          </aside>
        </div>
      </section>

      {/* MAPA FULL WIDTH */}
      <section className="contact-map-section">
        <div className="contact-map-wrap">
          <iframe
            className="contact-map-iframe"
            title="Mapa"
            src={MAP}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* BOTONES DEL MAPA (aquí van Copiar + Cómo llegar) */}
        <div className="container contact-map-actions">
          <button type="button" className="qa qa--ghost map-btn" onClick={handleCopyAddress}>
            📋 Copiar dirección
          </button>

          <a className="qa qa--primary map-btn" href={DIR_LINK} target="_blank" rel="noreferrer">
            📍 Cómo llegar
          </a>
        </div>
      </section>
    </main>
  );
}
