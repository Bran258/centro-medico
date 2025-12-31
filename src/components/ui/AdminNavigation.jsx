import { MdPerson, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";
import "@/styles/ui/AdminNavigation.css";

export default function AdminNavigation({ onLogout }) {
  const { role } = useAuth();

  const perfilPath =
    role === "admin"
      ? "/panel/admin/perfil"
      : "/panel/asistente/perfil";

  const homePath =
    role === "admin"
      ? "/panel/admin"
      : "/panel/asistente";

  return (
    <nav className="mg-nav">
      {/* LOGO IZQUIERDA */}
      <Link to={homePath} className="mg-nav-logo">
        <img src="/logo.png" alt="Logo" className="mg-nav-logo-img" />
        <span className="mg-nav-logo-title">
          Centro Médico Santa Rosa
        </span>
      </Link>

      {/* MENÚ DERECHA */}
      <ul className="mg-nav-list">
        <li>
          <Link
            to={perfilPath}
            className="mg-nav-btn"
            role="button"
          >
            <span className="mg-nav-icon">
              <MdPerson />
            </span>
            <span>Perfil</span>
          </Link>
        </li>

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

