export const campaigns = {
    // Configuración por defecto (Si no hay campaña activa)
    'default': {
        title: "Bienvenidos a Santa Rosa",
        subtitle: "Siempre Cuidando Tu Salud",
        cards: []
    },
    // CAMPAÑA 1: LLuvias y Dengue (Prioridad Alta)
    'lluvias': {
        id: 'lluvias',
        title: "⛈️ ALERTA DE TEMPORADA: PREVENCIÓN DENGUE",
        subtitle: "Atención prioritaria para cuadros febriles y respiratorios.",
        bgColor: "#e3f2fd", // Azulito suave lluvia
        titleColor: "#0277bd",
        cards: [
            {
                title: "PACK DENGUE",
                desc: "Consulta Médica + Hemograma + Descarte (Pr. Dengue)",
                icon: "🦟",
                btnText: "Ver Pack Febril",
                highlight: true
            },
            {
                title: "NEBULIZACIONES",
                desc: "Atención inmediata para asma y crisis respiratorias en niños.",
                icon: "🫁",
                btnText: "Ir a Tópico",
                highlight: false
            }
        ]
    },
    // CAMPAÑA 2: Fin de Año (Accidentes)
    'fin-anio': {
        id: 'fin-anio',
        title: "🚑 EMERGENCIAS FIN DE AÑO",
        subtitle: "Traumatología y Cirugía Menor lista para atenderte.",
        bgColor: "#ffebee", // Rojito emergencia
        titleColor: "#c62828",
        cards: [
            {
                title: "ACCIDENTES / SUTURAS",
                desc: "Atención rápida de heridas y traumatología.",
                icon: "🩹",
                btnText: "Urgencias",
                highlight: true
            },
            {
                title: "PERFIL HEPÁTICO",
                desc: "Chequeo completo de Gastroenterología tras las fiestas.",
                icon: "🤢",
                btnText: "Laboratorio",
                highlight: false
            }
        ]
    },
    // CAMPAÑA 3: Vitaminas (Energía)
    'vitaminas': {
        id: 'vitaminas',
        title: "⚡ RECARGA TU ENERGÍA 2026",
        subtitle: "Combate el agotamiento por calor.",
        bgColor: "#fff8e1", // Amarillo energía
        titleColor: "#f57f17",
        cards: [
            {
                title: "COCKTAIL VITAMINAS",
                desc: "Sueroterapia y vitaminas endovenosas para subir defensas.",
                icon: "💉",
                btnText: "Reservar Cita",
                highlight: true
            }
        ]
    }
};