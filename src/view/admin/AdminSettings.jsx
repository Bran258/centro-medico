import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { holidays } from '../../constants/holidaysData';
import { campaigns } from '../../constants/campaingsData';
import ThemeCard from './ThemeCard';
import '../../styles/AdminSettings.css';

// --- IMPORTAMOS LOS SERVICIOS DE SUPABASE ---
import { getDoctores, agendarCita } from '../../service/appointmentService';

const AdminSettings = () => {
    // 1. CONTEXTO EXISTENTE (Temas y Campañas)
    const { currentTheme, setCurrentTheme, currentCampaign, setCampaign, isAutomatic, toggleAutomatic, loading } = useContext(ThemeContext);

    // 2. ESTADOS NUEVOS (Para la Gestión de Citas)
    const [doctores, setDoctores] = useState([]);
    const [dni, setDni] = useState("");
    const [doctorSelec, setDoctorSelec] = useState("");
    const [fecha, setFecha] = useState(new Date().toISOString().split("T")[0]);
    const [mensajeCita, setMensajeCita] = useState(null);
    const [loadingCita, setLoadingCita] = useState(false);

    // 3. EFECTO: Cargar doctores al entrar al panel
    useEffect(() => {
        async function loadDoctores() {
            const data = await getDoctores();
            setDoctores(data);
        }
        loadDoctores();
    }, []);

    // 4. FUNCIÓN: Agendar la cita
    const handleAgendar = async (e) => {
        e.preventDefault();
        setMensajeCita(null);
        setLoadingCita(true);

        if (!dni || !doctorSelec || !fecha) {
            setMensajeCita({ error: true, text: "⚠️ Faltan datos por completar." });
            setLoadingCita(false);
            return;
        }

        const resultado = await agendarCita(dni, doctorSelec, fecha);

        setMensajeCita({ error: !resultado.success, text: resultado.message });
        if (resultado.success) setDni(""); // Limpiar DNI si fue exitoso
        setLoadingCita(false);
    };

    if (loading) return <div className="admin-container">Cargando configuración...</div>;

    return (
        <div className="admin-container">

            {/* ==============================================
                SECCIÓN 1: AUTOMATIZACIÓN (Tu código original)
               ============================================== */}
            <div className="automation-panel">
                <div className="auto-header">
                    <h2>⚙️ Modo de Operación</h2>
                    <p>Define si el sistema se gestiona solo o manualmente.</p>
                </div>

                <div className="switch-container">
                    <label className={`mode-option ${!isAutomatic ? 'selected' : ''}`}>
                        ✋ Control Manual
                    </label>

                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={isAutomatic}
                            onChange={(e) => toggleAutomatic(e.target.checked)}
                        />
                        <span className="slider round"></span>
                    </label>

                    <label className={`mode-option ${isAutomatic ? 'selected' : ''}`}>
                        🤖 Piloto Automático
                    </label>
                </div>

                {isAutomatic && (
                    <div className="auto-info">
                        <p>✅ El sistema ha detectado la fecha actual y ha aplicado la configuración óptima.</p>
                    </div>
                )}
            </div>

            <hr className="my-5" />

            {/* ==============================================
                SECCIÓN 2: TEMAS Y CAMPAÑAS (Tu código original)
               ============================================== */}
            <div style={{ opacity: isAutomatic ? 0.5 : 1, pointerEvents: isAutomatic ? 'none' : 'auto', transition: '0.3s' }}>
                <div className="admin-header">
                    <h1>🎨 Diseño Visual (Festividades)</h1>
                    {isAutomatic && <span className="locked-badge">BLOQUEADO POR AUTOMÁTICO</span>}
                </div>

                <div className="themes-grid">
                    {holidays.map((holiday) => (
                        <ThemeCard
                            key={holiday.id}
                            data={holiday}
                            isActive={currentTheme === holiday.class}
                            onClick={setCurrentTheme}
                        />
                    ))}
                </div>

                <hr className="my-5" />

                <div className="admin-header">
                    <h1>📢 Estrategia Comercial</h1>
                </div>

                <div className="themes-grid">
                    {Object.values(campaigns).map((camp) => (
                        <ThemeCard
                            key={camp.id || 'default'}
                            data={camp}
                            isActive={currentCampaign === camp.id}
                            onClick={setCampaign}
                        />
                    ))}
                </div>
            </div>

            <hr className="my-5" />

            {/* ==============================================
                SECCIÓN 3: GESTIÓN CLÍNICA (NUEVO CÓDIGO)
               ============================================== */}
            <div className="medical-panel" style={{ backgroundColor: "#fff", padding: "25px", borderRadius: "12px", border: "1px solid #e0e0e0" }}>
                <div className="admin-header">
                    <h1>🏥 Gestión de Citas (Base de Datos)</h1>
                    <span className="locked-badge" style={{ background: "#28a745" }}>SISTEMA ACTIVO</span>
                </div>
                <p style={{ marginBottom: "20px", color: "#666" }}>Asigna pacientes a doctores verificando disponibilidad en tiempo real.</p>

                <form onSubmit={handleAgendar} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    {/* DNI */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ fontWeight: "bold", marginBottom: "5px" }}>DNI Paciente:</label>
                        <input
                            type="text"
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                            maxLength={8}
                            placeholder="Ingrese 8 dígitos"
                            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                        />
                    </div>

                    {/* FECHA */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ fontWeight: "bold", marginBottom: "5px" }}>Fecha de Cita:</label>
                        <input
                            type="date"
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                        />
                    </div>

                    {/* DOCTOR (Ocupa todo el ancho) */}
                    <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column" }}>
                        <label style={{ fontWeight: "bold", marginBottom: "5px" }}>Seleccionar Especialista:</label>
                        <select
                            value={doctorSelec}
                            onChange={(e) => setDoctorSelec(e.target.value)}
                            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                        >
                            <option value="">-- Seleccione Doctor --</option>
                            {doctores.map(doc => (
                                <option key={doc.id} value={doc.id}>
                                    {doc.especialidad} — {doc.nombre} (Max: {doc.max_pacientes})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* BOTÓN */}
                    <button
                        type="submit"
                        disabled={loadingCita}
                        style={{
                            gridColumn: "1 / -1",
                            padding: "12px",
                            backgroundColor: loadingCita ? "#6c757d" : "#007bff",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "16px",
                            cursor: loadingCita ? "not-allowed" : "pointer",
                            marginTop: "10px"
                        }}
                    >
                        {loadingCita ? "⏳ Verificando disponibilidad..." : "📅 Asignar Cita"}
                    </button>
                </form>

                {/* MENSAJES DE RESPUESTA */}
                {mensajeCita && (
                    <div style={{
                        marginTop: "20px",
                        padding: "15px",
                        borderRadius: "8px",
                        backgroundColor: mensajeCita.error ? "#ffebee" : "#e8f5e9",
                        color: mensajeCita.error ? "#c62828" : "#2e7d32",
                        border: `1px solid ${mensajeCita.error ? "#ef9a9a" : "#a5d6a7"}`,
                        textAlign: "center",
                        fontWeight: "bold"
                    }}>
                        {mensajeCita.text}
                    </div>
                )}
            </div>

        </div>
    );
};

export default AdminSettings;