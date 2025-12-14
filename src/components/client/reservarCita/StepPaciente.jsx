import "@/styles/client/reservarCita/StepPaciente.css";

export default function StepPaciente({ 
  paciente, setPaciente,
  telefono, setTelefono,
  sintomas, setSintomas,
  tipoCita, setTipoCita
}) {

  return (
    <div className="card step-card">

      <h2 className="step-title">Paso 1: Datos del Paciente y Motivo</h2>

      <div className="d-flex flex-column gap-4">

        {/* NOMBRE */}
        <div className="d-flex flex-column gap-1">
          <label className="label-text">Nombre del Paciente</label>
          <input
            type="text"
            className="form-control custom-input"
            placeholder="Escriba su nombre completo"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
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

              // permite SOLO números
              if (/^\d*$/.test(val)) {
                setTelefono(val);
              }
            }}
            maxLength={9}
            required
          />

          {/* Mensaje de error */}
          {telefono.length > 0 && telefono.length < 9 && (
            <small className="text-danger">El número debe tener 9 dígitos.</small>
          )}
        </div>

        {/* RADIO */}
        <div className="d-flex flex-column gap-1">
          <label className="label-text">
            ¿Es la cita para usted o para un menor?
          </label>

          <div className="d-flex align-items-center gap-4 mt-1">

            <label className="d-flex align-items-center gap-2 pointer">
              <input
                type="radio"
                name="cita"
                value="adulto"
                checked={tipoCita === "adulto"}
                onChange={() => setTipoCita("adulto")}
              />
              <span className="label-text">Para mí</span>
            </label>

            <label className="d-flex align-items-center gap-2 pointer">
              <input
                type="radio"
                name="cita"
                value="menor"
                checked={tipoCita === "menor"}
                onChange={() => setTipoCita("menor")}
              />
              <span className="label-text">Para un menor</span>
            </label>

          </div>
        </div>

        {/* SÍNTOMAS */}
        <div className="d-flex flex-column gap-1">
          <label className="label-text">¿Qué síntoma o malestar presenta?</label>

          <textarea
            rows="4"
            className="form-control custom-textarea"
            placeholder="Describa brevemente sus síntomas..."
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          ></textarea>
        </div>

      </div>
    </div>
  );
}