import { FiArrowUpRight, FiArrowDownRight, FiMinus } from "react-icons/fi";
import "./StatsSection.css";

export default function StatsSection() {
  return (
    <section className="dash-stats">

      <div className="dash-card">
        <p className="dash-card-label">Citas para Hoy</p>
        <p className="dash-card-value">25</p>
        <p className="dash-card-trend green">
          <FiArrowUpRight className="icon-trend" />
          +5%
        </p>
      </div>

      <div className="dash-card">
        <p className="dash-card-label">Pacientes Atendidos</p>
        <p className="dash-card-value">18</p>
        <p className="dash-card-trend red">
          <FiArrowDownRight className="icon-trend" />
          -2%
        </p>
      </div>

      <div className="dash-card">
        <p className="dash-card-label">Personal de Turno</p>
        <p className="dash-card-value">8</p>
        <p className="dash-card-trend gray">
          <FiMinus className="icon-trend" />
          0%
        </p>
      </div>

    </section>
  );
}

