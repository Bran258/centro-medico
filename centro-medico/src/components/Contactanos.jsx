// src/components/Contactanos.jsx
import React from "react";
import "../styles/ContactoView.css";

const FORM_ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT || "https://formspree.io/f/xxxxxxxx"; // <-- cambia por tu endpoint
const LAT = -12.046374; // <-- pon tu latitud real
const LNG = -77.042793; // <-- pon tu longitud real
const MAP = `https://www.google.com/maps?q=${LAT},${LNG}&z=15&output=embed`;

export default function Contactanos() {
  return (
    <main className="contact-page container">
      <header className="contact-header">
        <h1>Contáctanos</h1>
        <p>
          <strong>Emergencias 24/7:</strong>{" "}
          <a href="tel:+51XXXXXXXXX">+51 X XXX XXX</a>
        </p>
      </header>

      <div className="contact-grid">
        {/* Formulario */}
        <section className="panel">
          <h2>Escríbenos</h2>

          {/* Reemplaza FORM_ENDPOINT por tu servicio (Formspree / backend propio) */}
          <form method="POST" action={FORM_ENDPOINT}>
            <div className="row">
              <p>
                <label htmlFor="nombre">Nombre</label>
                <input id="nombre" name="nombre" required />
              </p>
              <p>
                <label htmlFor="email">Correo</label>
                <input id="email" type="email" name="email" required />
              </p>
            </div>

            <p>
              <label htmlFor="asunto">Asunto</label>
              <input id="asunto" name="asunto" />
            </p>

            <p>
              <label htmlFor="mensaje">Mensaje</label>
              <textarea id="mensaje" name="mensaje" rows="6" required />
            </p>

            <button className="btn" type="submit">
              Enviar
            </button>
          </form>
        </section>

        {/* Datos y mapa */}
        <aside className="panel">
          <h2>Ubicación y horarios</h2>

          <p>
            <strong>Dirección:</strong> Av. Ejemplo 123, Distrito – Ciudad
          </p>
          <p>
            <strong>Central:</strong>{" "}
            <a href="tel:+51YYYYYYYYY">+51 Y YYY YYY</a>
          </p>
          <p>
            <strong>WhatsApp:</strong>{" "}
            <a
              href="https://wa.me/51ZZZZZZZZZ"
              target="_blank"
              rel="noreferrer"
            >
              Chatear
            </a>
          </p>
          <p>
            <strong>Horario:</strong> L–V 8:00–20:00 · S 8:00–14:00
          </p>

          <h3>Cómo llegar</h3>
          <iframe title="Mapa de la clínica" src={MAP} loading="lazy" />
          <a
            className="btn"
            href={`https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`}
            target="_blank"
            rel="noreferrer"
          >
            Cómo llegar
          </a>
        </aside>
      </div>
    </main>
  );
}
