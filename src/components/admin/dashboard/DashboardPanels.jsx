import "./DashboardPanels.css";
import { MdTrendingUp, MdMedication, MdPriorityHigh, MdPeople } from "react-icons/md";

export default function DashboardPanels() {
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
                        +8%
                    </div>
                </div>
                <div className="dash-chart">
                    <div className="day-block">
                        <div className="dash-bar bg-light"></div>
                        <p>Lun</p>
                    </div>
                    <div className="day-block">
                        <div className="dash-bar bg-light"></div>
                        <p>Mar</p>
                    </div>
                    <div className="day-block">
                        <div className="dash-bar bg-light"></div>
                        <p>Mié</p>
                    </div>
                    <div className="day-block">
                        <div className="dash-bar bg-strong"></div>
                        <p>Jue</p>
                    </div>
                    <div className="day-block">
                        <div className="dash-bar bg-strong"></div>
                        <p>Vie</p>
                    </div>
                    <div className="day-block">
                        <div className="dash-bar bg-light"></div>
                        <p>Sáb</p>
                    </div>
                    <div className="day-block">
                        <div className="dash-bar bg-light"></div>
                        <p>Dom</p>
                    </div>
                </div>
            </div>

            {/* PANEL 2 - Tareas */}
            <div className="dash-panel sidebar-box">
                <h3 className="dash-panel-title">Tareas y Notificaciones</h3>

                <div className="dash-task">
                    <div className="dash-task-icon blue">
                        <MdMedication size={22} />
                    </div>
                    <div>
                        <p className="dash-task-title">Revisar inventario de medicamentos</p>
                        <p className="dash-task-time">Vence en 2 días</p>
                    </div>
                </div>

                <div className="dash-task">
                    <div className="dash-task-icon blue">
                        <MdMedication size={22} />
                    </div>
                    <div>
                        <p className="dash-task-title">Revisar inventario de medicamentos</p>
                        <p className="dash-task-time">Vence en 2 días</p>
                    </div>
                </div>

                <div className="pagination-demo">
                    &lt; 1 2 3 4 5 6 7 8 9 10 &gt;
                </div>
            </div>
            {/* PANEL 3 - Horarios con Alta Demanda */}
            <div className="dash-panel medium side-right">
                <h3 className="dash-panel-title">Horarios con Alta Demanda</h3>

                <ul className="hours-full-list">
                    <li>
                        <span>09:00 AM</span>
                        <b><MdPeople size={18} /> 14 pacientes</b>
                    </li>

                    <li>
                        <span>10:00 AM</span>
                        <b><MdPeople size={18} /> 12 pacientes</b>
                    </li>

                    <li>
                        <span>11:30 AM</span>
                        <b><MdPeople size={18} /> 18 pacientes</b>
                    </li>

                    <li>
                        <span>04:00 PM</span>
                        <b><MdPeople size={18} /> 11 pacientes</b>
                    </li>
                </ul>
            </div>

            {/* PANEL 4 - Próximas Citas */}
            <div className="dash-panel medium side-left">
                <div className="dash-panel-header spaced">
                    <h3 className="dash-panel-title">Próximas Citas</h3>
                    <a className="dash-link-primary" href="#">Ver Calendario Completo</a>
                </div>

                <div className="dash-appointments">
                    <div className="dash-appointment">
                        <div className="dash-appointment-left">
                            <img className="dash-avatar" src="" alt="Paciente" />
                            <div>
                                <p className="dash-appointment-name">Carlos Ruiz</p>
                                <p className="dash-appointment-info">09:00 AM - Cardiología</p>
                            </div>
                        </div>
                        <p className="dash-appointment-doctor">Dr. Evelyn Reed</p>
                    </div>

                    <div className="dash-appointment">
                        <div className="dash-appointment-left">
                            <img className="dash-avatar" src="" alt="Paciente" />
                            <div>
                                <p className="dash-appointment-name">Ana Gómez</p>
                                <p className="dash-appointment-info">09:30 AM - Pediatría</p>
                            </div>
                        </div>
                        <p className="dash-appointment-doctor">Dr. Ben Carter</p>
                    </div>

                    <div className="dash-appointment">
                        <div className="dash-appointment-left">
                            <img className="dash-avatar" src="" alt="Paciente" />
                            <div>
                                <p className="dash-appointment-name">Ana Gómez</p>
                                <p className="dash-appointment-info">09:30 AM - Pediatría</p>
                            </div>
                        </div>
                        <p className="dash-appointment-doctor">Dr. Ben Carter</p>
                    </div>

                    <div className="dash-appointment">
                        <div className="dash-appointment-left">
                            <img className="dash-avatar" src="" alt="Paciente" />
                            <div>
                                <p className="dash-appointment-name">Ana Gómez</p>
                                <p className="dash-appointment-info">09:30 AM - Pediatría</p>
                            </div>
                        </div>
                        <p className="dash-appointment-doctor">Dr. Ben Carter</p>
                    </div>
                </div>
            </div>

        </section>
    );
}