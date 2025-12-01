import React from 'react';

const ThemeCard = ({ data, isActive, onClick }) => {

    // 1. INTELIGENCIA DE DATOS:
    // Si tiene "name", es una Festividad. Si tiene "title", es una Campaña.
    // Usamos ?.split(':')[0] para que en campañas largas solo muestre la primera parte del título.
    const displayName = data.name || (data.title ? data.title.split(':')[0] : 'Sin nombre');

    // 2. INTELIGENCIA DE ICONOS:
    // Las festividades tienen .icon directo. Las campañas lo tienen dentro de la primera tarjeta (cards[0]).
    const displayIcon = data.icon || (data.cards && data.cards[0]?.icon) || '📢';

    // 3. INTELIGENCIA DE CLICK:
    // Si es Festividad, enviamos .class. Si es Campaña, enviamos .id.
    const handleClick = () => {
        const valueToSend = data.class !== undefined ? data.class : data.id;
        onClick(valueToSend);
    };

    return (
        <button
            className={`theme-card-btn ${isActive ? 'active' : ''}`}
            onClick={handleClick}
        >
            <div className="icon">{displayIcon}</div>
            <div className="info">
                <span className="name">{displayName}</span>
            </div>
            {isActive && <div className="badge">ACTIVO</div>}
        </button>
    );
};

export default ThemeCard;