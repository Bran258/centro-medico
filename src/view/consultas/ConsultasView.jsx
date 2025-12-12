import React, { useState } from "react";
import { consultarCitasPorDni } from "../../service/appointmentService";

// IMPORTAMOS LOS ESTILOS
import "../../styles/ConsultasView.css";

const ConsultasView = () => {
    const [dni, setDni] = useState("");
    const [citas, setCitas] = useState([]);
    const [buscado, setBuscado] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleBuscar = async (e) => {
        e.preventDefault();
        if (!dni) return;

        setLoading(true);
        setBuscado(false);

        const resultado = await consultarCitasPorDni(dni);

        if (resultado.success) {
            setCitas(resultado.data);
        }

        setLoading(false);
        setBuscado(true);
    };

    return (
        <div className="consultas-container">

            {/* ENCABEZADO */}
            <div className="consultas-header">
                <h1>🔎 Consulta tu Cita Médica</h1>
                <p>Ingresa tu número de DNI para ver tus programaciones.</p>
            </div>

            {/* BARRA DE BÚSQUEDA */}
            <form onSubmit={handleBuscar} className="consultas-form">
                <input
                    type="text"
                    placeholder="Ingresa tu DNI (8 dígitos)"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    maxLength={8}
                    className="consultas-input"
                />
                <button type="submit" disabled={loading} className="consultas-btn">
                    {loading ? "Buscando..." : "Consultar"}
                </button>
            </form>

            {/* RESULTADOS */}
            {buscado && (
                <div className="resultados-container">
                    {citas.length > 0 ? (
                        <div className="resultados-grid">
                            {citas.map((cita) => (
                                <div key={cita.id} className="cita-card">

                                    <div className="doctor-info">
                                        <h3>👨‍⚕️ Dr(a). {cita.doctores?.nombre || "No asignado"}</h3>
                                        <span className="badge-especialidad">
                                            {cita.doctores?.especialidad}
                                        </span>
                                    </div>

                                    <div className="fecha-info">
                                        <p className="fecha-label">Fecha Programada</p>
                                        <h2 className="fecha-valor">{cita.fecha_cita}</h2>
                                    </div>

                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <span className="emoji-icon">🤷‍♂️</span>
                            <h3>No encontramos citas</h3>
                            <p>No hay registros para el DNI: <b>{dni}</b></p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ConsultasView;