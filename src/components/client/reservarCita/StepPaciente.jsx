import "@/styles/client/reservarCita/StepPaciente.css";

export default function StepPaciente({ 
  nombres, setNombres,
  apellidos, setApellidos,
  email, setEmail,
  telefono, setTelefono,
  sintomas, setSintomas,
  tipoCita, setTipoCita
}) {
  return (
    <div className="card step-card">
      <h2 className="step-title">Paso 1: Datos del Paciente y Motivo</h2>

      <div className="d-flex flex-column gap-4">

        {/* NOMBRES */}
        <div className="d-flex flex-column gap-1">
          <label className="label-text">Nombres</label>
          <input
            type="text"
            className="form-control custom-input"
            placeholder="Ej: Juan Carlos"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
          />
        </div>

        {/* APELLIDOS */}
        <div className="d-flex flex-column gap-1">
          <label className="label-text">Apellidos</label>
          <input
            type="text"
            className="form-control custom-input"
            placeholder="Ej: Pérez Gómez"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
        </div>

        {/* EMAIL */}
        <div className="d-flex flex-column gap-1">
          <label className="label-text">Correo electrónico</label>
          <input
            type="email"
            className="form-control custom-input"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* CELULAR */}
        <div className="d-flex flex-column gap-1">
          <label className="label-text">Número de Celular</label>
          <input
            type="text"
            className={`form-control custom-input ${
              telefono.length > 0 && telefono.length < 9 ? "is-invalid" : ""
            }`}
            placeholder="Ej: 987654321"
            value={telefono}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*$/.test(val)) setTelefono(val);
            }}
            maxLength={9}
          />

          {telefono.length > 0 && telefono.length < 9 && (
            <small className="text-danger">
              El número debe tener 9 dígitos.
            </small>
          )}
        </div>

        {/* TIPO DE CITA */}
        <div className="d-flex flex-column gap-1">
          <label className="label-text">
            ¿Es la cita para usted o para un menor?
          </label>

          <div className="d-flex gap-4 mt-1">
            <label className="d-flex align-items-center gap-2 pointer">
              <input
                type="radio"
                name="cita"
                value="adulto"
                checked={tipoCita === "adulto"}
                onChange={() => setTipoCita("adulto")}
              />
              <span>Para mí</span>
            </label>

            <label className="d-flex align-items-center gap-2 pointer">
              <input
                type="radio"
                name="cita"
                value="menor"
                checked={tipoCita === "menor"}
                onChange={() => setTipoCita("menor")}
              />
              <span>Para un menor</span>
            </label>
          </div>
        </div>

        {/* SÍNTOMAS */}
        <div className="d-flex flex-column gap-1">
          <label className="label-text">
            ¿Qué síntoma o malestar presenta?
          </label>
          <textarea
            rows="4"
            className="form-control custom-textarea"
            placeholder="Describa brevemente sus síntomas..."
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

      </div>
    </div>
  );
}
