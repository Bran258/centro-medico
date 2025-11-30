import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "../../styles/reservarCita/StepCalendario.css";

export default function StepCalendario({ selectedDay, setSelectedDay }) {
  return (
    <div className="card calendario-card">

      <h2 className="calendario-title">
        Paso 2: Selecciona el día y la hora
      </h2>

      <div className="calendario-box">

        <div className="d-flex justify-content-center">
          <div className="calendario-wrapper">
            <DayPicker
              mode="single"
              selected={selectedDay}
              onSelect={setSelectedDay}
              weekStartsOn={1}
              showOutsideDays
              fixedWeeks
              disabled={{ before: new Date() }}   // Bloquea fechas anteriores
            />
          </div>
        </div>

      </div>
    </div>
  );
}