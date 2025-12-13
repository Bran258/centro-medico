import "../../../styles/contacto/ContactoView.css";

const LAT = -12.046374;
const LNG = -77.042793;
const MAP = `https://www.google.com/maps?q=${LAT},${LNG}&z=15&output=embed`;

export default function Contactanos({ form, onChange, onSubmit, status }) {
  return (
    <main className="contact-page container">
      <header className="contact-header">
        <h1>Contáctanos</h1>
        <p><strong>Emergencias 24/7:</strong> <a href="tel:+51XXXXXXXXX">+51 X XXX XXX</a></p>
      </header>

      <div className="contact-grid">

        {/* FORMULARIO */}
        <section className="panel">
          <h2>Escríbenos</h2>

          <form onSubmit={onSubmit}>
            <div className="row">
              <p>
                <label>Nombre</label>
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={(e)=>onChange("nombre", e.target.value)}
                  required
                />
              </p>

              <p>
                <label>Correo</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e)=>onChange("email", e.target.value)}
                  required
                />
              </p>
            </div>

            <p>
              <label>Asunto</label>
              <input
                name="asunto"
                value={form.asunto}
                onChange={(e)=>onChange("asunto", e.target.value)}
              />
            </p>

            <p>
              <label>Mensaje</label>
              <textarea
                name="mensaje"
                rows="6"
                value={form.mensaje}
                onChange={(e)=>onChange("mensaje", e.target.value)}
                required
              />
            </p>

            <button type="submit" className="btn" disabled={status.sending}>
              {status.sending ? "Enviando..." : "Enviar"}
            </button>

            {status.ok && <p className="ok-msg">Mensaje enviado correctamente.</p>}
            {status.ok === false && <p className="err-msg">Error: {status.error}</p>}
          </form>
        </section>

        {/* MAPA + DATOS */}
        <aside className="panel">
          <h2>Ubicación y horarios</h2>

          <p><strong>Dirección:</strong> Av. Ejemplo 123</p>
          <p><strong>Central:</strong> <a href="tel:+51YYYYYYYYY">+51 Y YYY YYY</a></p>

          <iframe title="Mapa" src={MAP} loading="lazy" />

          <a className="btn"
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
