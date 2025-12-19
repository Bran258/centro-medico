import { MdPerson, MdNotifications, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import "@/styles/ui/AdminNavigation.css";

export default function AdminNavigation({ onLogout }) {
  const menuItems = [
    {
      label: "Perfil",
      icon: <MdPerson />,
      to: "/panel/admin/perfil",
    },
  ];

  return (
    <nav className="mg-nav">
      {/* LOGO IZQUIERDA */}
      <Link to="/panel/admin" className="mg-nav-logo">
        <img
          src="/logo.png"
          alt="Logo"
          className="mg-nav-logo-img"
        />
        <span className="mg-nav-logo-title">
          Centro Médico Santa Rosa
        </span>
      </Link>

      {/* MENÚ DERECHA */}
      <ul className="mg-nav-list">
        {menuItems.map((item) => (
          <li key={item.label}>
            <Link
              to={item.to}
              className="mg-nav-btn"
              role="button"
            >
              <span className="mg-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}

        <li>
          <button
            type="button"
            className="mg-nav-btn logout"
            onClick={onLogout}
          >
            <MdLogout className="mg-nav-icon" />
            Cerrar sesión
          </button>
        </li>
      </ul>
    </nav>
  );
}
