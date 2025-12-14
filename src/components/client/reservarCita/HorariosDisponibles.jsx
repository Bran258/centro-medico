import "@/styles/client/reservarCita/HorariosDisponibles.css";

export default function HorariosDisponibles({ selectedHour, setSelectedHour }) {

  const horasManana = ["08:00","08:30","09:00","09:30","10:30","11:00","11:30","12:00"];
  const horasTarde = ["15:00","15:30", "16:00", "16:30", "17:00", "17:30", "18:00"];

  return (
    <div className="card horarios-card">
      <h3 className="horarios-title">
        Selecciona un horario disponible
      </h3>

      <div className="d-flex flex-column gap-4">

        {/* MAÑANA */}
        <div>
          <p className="horarios-section">Mañana</p>

          <div className="row g-2">
            {horasManana.map(h => (
              <div className="col-3" key={h}>
                <button
                  className={
                    selectedHour === h
                      ? "btn selected-hour w-100"
                      : "btn btn-hour w-100"
                  }
                  onClick={() => setSelectedHour(h)}
                >
                  {h}
                </button>
              </div>
            ))}
          </div>
        </div>

        <hr />

        {/* TARDE */}
        <div>
          <p className="horarios-section">Tarde</p>

          <div className="row g-2">

            {horasTarde.map(h => (
              <div className="col-3" key={h}>
                <button
                  className={
                    selectedHour === h
                      ? "btn selected-hour w-100"
                      : "btn btn-hour w-100"
                  }
                  onClick={() => setSelectedHour(h)}
                >
                  {h}
                </button>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}
