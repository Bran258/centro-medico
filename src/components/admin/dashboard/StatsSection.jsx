import { FiArrowUpRight, FiArrowDownRight, FiMinus } from "react-icons/fi";
import "./StatsSection.css";

export default function StatsSection({ stats }) {
  // stats: { citasHoy, pendientes, confirmadas, atendidas, canceladas }
  if (!stats) return null;

  return (
    <section className="dash-stats">
      <div className="dash-card">
        <p className="dash-card-label">Citas para Hoy</p>
        <p className="dash-card-value">{stats.citasHoy ?? 0}</p>
        <p className="dash-card-trend gray">
          <FiMinus className="icon-trend" />
          —
        </p>
      </div>

      <div className="dash-card">
        <p className="dash-card-label">Pendientes</p>
        <p className="dash-card-value">{stats.pendientes ?? 0}</p>
        <p className="dash-card-trend gray">
          <FiMinus className="icon-trend" />
          —
        </p>
      </div>

      <div className="dash-card">
        <p className="dash-card-label">Atendidas</p>
        <p className="dash-card-value">{stats.atendidas ?? 0}</p>
        <p className="dash-card-trend green">
          <FiArrowUpRight className="icon-trend" />
          —
        </p>
      </div>
    </section>
  );
}
