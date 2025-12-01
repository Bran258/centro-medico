// src/utils/dateLogic.js

export const getAutoConfig = () => {
    const today = new Date();
    const month = today.getMonth(); // 0 = Enero, 11 = Diciembre
    const day = today.getDate();

    // Configuración por defecto
    let config = {
        theme: '', // Tema Original
        campaign: 'default'
    };

    // --- LÓGICA DE CALENDARIO ---

    // 1. DICIEMBRE (Navidad + Fin de Año)
    if (month === 11) {
        config.theme = 'theme-navidad';
        config.campaign = 'fin-anio'; // Emergencias y excesos
    }

    // 2. ENERO - MARZO (Temporada de Lluvias/Dengue)
    else if (month >= 0 && month <= 2) {
        config.theme = (month === 0 && day <= 7) ? 'theme-new-year' : ''; // Año nuevo solo la 1ra semana
        config.campaign = 'lluvias'; // Prioridad Dengue
    }

    // 3. JUNIO - JULIO (Fiestas Patrias + Vitaminas por cambio de clima)
    else if (month === 5 || month === 6) {
        config.theme = 'theme-peru'; // Bandera/Patrias
        config.campaign = 'vitaminas'; // Energía para mitad de año
    }

    // 4. OCTUBRE (Señor de los Milagros / Angamos)
    else if (month === 9) {
        config.theme = 'theme-santos'; // Morado
        config.campaign = 'default';
    }

    return config;
};