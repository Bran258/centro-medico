// src/components/ui/ManagementNavigation.jsx
import { MdPerson, MdNotifications, MdLogout } from "react-icons/md";
import "@/styles/ui/ManagementNavigation.css";

export default function ManagementNavigation({ onLogout }) {
  const menuItems = [
    { label: "Perfil", icon: <MdPerson />, action: () => console.log("Perfil") },
    { label: "Notificaciones", icon: <MdNotifications />, action: () => console.log("Notificaciones") },
  ];

  return (
    <nav className="mg-nav">

      {/* LOGO IZQUIERDA */}
      <div className="mg-nav-logo">
        <img
          src="/logo.png"   // CAMBIA POR TU LOGO REAL
          alt="Logo"
          className="mg-nav-logo-img"
        />
        <span className="mg-nav-logo-title">Centro Médico Santa Rosa</span>
      </div>

      {/* MENÚ DERECHA */}
      <ul className="mg-nav-list">

        {menuItems.map((item) => (
          <li key={item.label}>
            <button className="mg-nav-btn" onClick={item.action}>
              <span className="mg-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          </li>
        ))}

        <li>
          <button className="mg-nav-btn logout" onClick={onLogout}>
            <MdLogout className="mg-nav-icon" />
            Cerrar sesión
          </button>
        </li>

      </ul>
    </nav>
  );
}
