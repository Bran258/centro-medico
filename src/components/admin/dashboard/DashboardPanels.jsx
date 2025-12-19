import "./DashboardPanels.css";
import { MdTrendingUp, MdMedication, MdPeople } from "react-icons/md";
import { Link } from "react-router-dom";

const formatHora = (horaISO) => {
  if (!horaISO) return "—";
  return new Date(horaISO).toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const formatFecha = (fechaISO) => {
  if (!fechaISO) return "—";
  return new Date(fechaISO).toLocaleDateString("es-PE");
};

const getEstadoLabel = (estado) => {
  if (!estado) return "—";
  return estado.charAt(0).toUpperCase() + estado.slice(1);
};

export default function DashboardPanels({ porEstado, ultimos7, proximas }) {
  // ultimos7: [{fecha:"YYYY-MM-DD", total:number}]
  // porEstado: [{estado:"pendiente", total:number}]
  // proximas: citas con include cliente + medico + especialidad

  const max7 = Math.max(1, ...ultimos7.map((x) => x.total || 0));

  // Para “Horarios con alta demanda”: lo saco de próximas (simple)
  const horariosCount = {};
  proximas?.forEach((c) => {
    const h = formatHora(c.hora_solicitada);
    if (h !== "—") horariosCount[h] = (horariosCount[h] || 0) + 1;
  });

  const topHorarios = Object.entries(horariosCount)
    .map(([hora, total]) => ({ hora, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 4);

  // Tareas demo: puedes reemplazarlo luego
  const tareasDemo = [
    { title: "Revisar citas pendientes", time: "Prioridad alta" },
    { title: "Confirmar asignación de médicos", time: "Hoy" },
  ];

  return (
    <section className="dash-grid">
      {/* PANEL 1 - Rendimiento */}
      <div className="dash-panel large">
        <div className="dash-panel-header">
          <div>
            <p className="dash-panel-title">Rendimiento de Citas</p>
            <p className="dash-panel-subtitle">Últimos 7 días</p>
          </div>

          <div className="dash-growth green">
            <MdTrendingUp size={22} />
            {/* Demo simple */}
            +{Math.round(
              (ultimos7.reduce((a, b) => a + (b.total || 0), 0) / 7) * 10
            ) / 10}
          </div>
        </div>

        <div className="dash-chart">
          {(ultimos7 || []).map((d) => {
            const heightPct = Math.round(((d.total || 0) / max7) * 100);
            const day = new Date(d.fecha + "T00:00:00");
            const name = day.toLocaleDateString("es-PE", { weekday: "short" });

            return (
              <div className="day-block" key={d.fecha}>
                {/* Mantengo tus clases: bg-light / bg-strong */}
                <div
                  className={`dash-bar ${heightPct >= 60 ? "bg-strong" : "bg-light"}`}
                  style={{ height: `${Math.max(10, heightPct)}%` }}
                  title={`${d.fecha}: ${d.total}`}
                />
                <p>{name}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* PANEL 2 - Tareas */}
      <div className="dash-panel sidebar-box">
        <h3 className="dash-panel-title">Tareas y Notificaciones</h3>

        {tareasDemo.map((t, idx) => (
          <div className="dash-task" key={idx}>
            <div className="dash-task-icon blue">
              <MdMedication size={22} />
            </div>
            <div>
              <p className="dash-task-title">{t.title}</p>
              <p className="dash-task-time">{t.time}</p>
            </div>
          </div>
        ))}

        <div className="pagination-demo">
          {/* conteo por estado */}
          {(porEstado || []).map((e) => (
            <span key={e.estado} style={{ marginRight: 10 }}>
              {getEstadoLabel(e.estado)}: <b>{e.total}</b>
            </span>
          ))}
        </div>
      </div>

      {/* PANEL 3 - Horarios con Alta Demanda */}
      <div className="dash-panel medium side-right">
        <h3 className="dash-panel-title">Horarios con Alta Demanda</h3>

        <ul className="hours-full-list">
          {topHorarios.length === 0 && (
            <li>
              <span>—</span>
              <b>
                <MdPeople size={18} /> 0 pacientes
              </b>
            </li>
          )}

          {topHorarios.map((h) => (
            <li key={h.hora}>
              <span>{h.hora}</span>
              <b>
                <MdPeople size={18} /> {h.total} pacientes
              </b>
            </li>
          ))}
        </ul>
      </div>

      {/* PANEL 4 - Próximas Citas */}
      <div className="dash-panel medium side-left">
        <div className="dash-panel-header spaced">
          <h3 className="dash-panel-title">Próximas Citas</h3>
          <Link className="dash-link-primary" to="/panel/admin/citas">
            Ver Todas
          </Link>
        </div>

        <div className="dash-appointments">
          {(proximas || []).map((cita) => {
            const paciente = `${cita.cliente?.nombres || ""} ${cita.cliente?.apellidos || ""}`.trim();
            const especialidad = cita.medico?.especialidad?.nombre || "Sin asignar";
            const doctor = cita.medico?.persona
              ? `${cita.medico.persona.nombres} ${cita.medico.persona.apellidos}`
              : "Sin asignar";

            return (
              <div className="dash-appointment" key={cita.id}>
                <div className="dash-appointment-left">
                  {/* IMPORTANTE: NO pongas src="" porque rompe consola */}
                  <div className="dash-avatar-fake" aria-hidden="true">
                    {(paciente[0] || "P").toUpperCase()}
                  </div>

                  <div>
                    <p className="dash-appointment-name">{paciente || "Paciente"}</p>
                    <p className="dash-appointment-info">
                      {formatHora(cita.hora_solicitada)} - {especialidad} ({formatFecha(cita.fecha_solicitada)})
                    </p>
                  </div>
                </div>

                <p className="dash-appointment-doctor">{doctor}</p>
              </div>
            );
          })}

          {(!proximas || proximas.length === 0) && (
            <p style={{ margin: 0, color: "#6b7280" }}>No hay próximas citas.</p>
          )}
        </div>
      </div>
    </section>
  );
}
