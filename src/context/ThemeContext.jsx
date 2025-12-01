// src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { getAutoConfig } from '../utils/dateLogic'; // <--- IMPORTAR LÓGICA

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentThemeState] = useState('');
    const [currentCampaign, setCurrentCampaign] = useState('default');
    const [isAutomatic, setIsAutomaticState] = useState(false); // NUEVO ESTADO
    const [loading, setLoading] = useState(true);

    const API_URL = 'http://localhost:5000/api/theme';

    const fetchTheme = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (data) {
                // Guardamos el estado del interruptor
                setIsAutomaticState(data.isAutomatic);

                // Si está en AUTO, calculamos. Si está en MANUAL, usamos lo de la BD.
                if (data.isAutomatic) {
                    runAutoMode();
                } else {
                    if (data.activeTheme !== undefined) applyTheme(data.activeTheme);
                    if (data.activeCampaign !== undefined) setCurrentCampaign(data.activeCampaign);
                }
            }
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchTheme(); }, []);

    // Función auxiliar para ejecutar la lógica de fechas
    const runAutoMode = () => {
        const autoSettings = getAutoConfig();
        console.log("Modo Automático Activado:", autoSettings);
        applyTheme(autoSettings.theme);
        setCurrentCampaign(autoSettings.campaign);
    };

    const applyTheme = (themeClass) => {
        setCurrentThemeState(themeClass);
        document.body.className = themeClass || '';
    };

    // Función Maestra de Guardado
    const saveConfig = async (key, value) => {
        // Si activamos el modo automático, ejecutamos la lógica inmediatamente
        if (key === 'isAutomatic') {
            setIsAutomaticState(value);
            if (value === true) runAutoMode();
        }

        // Si estamos en manual, aplicamos los cambios visuales normales
        else if (!isAutomatic) {
            if (key === 'theme') applyTheme(value);
            if (key === 'campaign') setCurrentCampaign(value);
        }

        // Guardar en Backend
        try {
            await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [key]: value })
            });
        } catch (error) { console.error(error); }
    };

    return (
        <ThemeContext.Provider
            value={{
                currentTheme,
                currentCampaign,
                isAutomatic, // Exponemos el estado
                toggleAutomatic: (val) => saveConfig('isAutomatic', val), // Función switch
                setCurrentTheme: (val) => !isAutomatic && saveConfig('theme', val), // Bloqueamos si es auto
                setCampaign: (val) => !isAutomatic && saveConfig('campaign', val),   // Bloqueamos si es auto
                loading
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};