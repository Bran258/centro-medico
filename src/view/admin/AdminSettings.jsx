import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { holidays } from '../../constants/holidaysData';
// --- ESTA ES LA LÍNEA QUE TE FALTABA ---
import { campaigns } from '../../constants/campaingsData';
import ThemeCard from './ThemeCard';
import '../../styles/AdminSettings.css';
const AdminSettings = () => {
    // Traemos isAutomatic y toggleAutomatic
    const { currentTheme, setCurrentTheme, currentCampaign, setCampaign, isAutomatic, toggleAutomatic, loading } = useContext(ThemeContext);

    if (loading) return <div className="admin-container">Cargando...</div>;

    return (
        <div className="admin-container">

            {/* --- NUEVO: PANEL DE CONTROL DE AUTOMATIZACIÓN --- */}
            <div className="automation-panel">
                <div className="auto-header">
                    <h2>⚙️ Modo de Operación</h2>
                    <p>Define si el sistema se gestiona solo o manualmente.</p>
                </div>

                <div className="switch-container">
                    <label className={`mode-option ${!isAutomatic ? 'selected' : ''}`}>
                        ✋ Control Manual
                    </label>

                    {/* SWITCH TOGGLE CSS */}
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

            {/* BLOQUEO VISUAL: Si es automático, desvanecemos los controles manuales */}
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

        </div>
    );
};

export default AdminSettings;