import { NavLink } from "react-router-dom";
import { MdHistory, MdEvent } from "react-icons/md";
import "@/styles/ui/ManagementSidebar.css";

const menuItems = [
  { label: "Citas", icon: <MdEvent />, path: "/panel/asistente/gestion_citas" },
  { label: "Historial", icon: <MdHistory />, path: "/panel/asistente/gestion_historial" },
];

export default function SidebarAsistente() {
  return (
    <aside className="sidebarAdmin">
      <div className="sidebarAdmin-header">
        <h2 className="sidebarAdmin-title">Panel Admin</h2>
      </div>

      <nav className="sidebarAdmin-menu">
        <ul className="sidebarAdmin-list">
          {menuItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `sidebarAdmin-item ${isActive ? "active" : ""}`
                }
              >
                <span className="sidebarAdmin-icon">{item.icon}</span>
                <span className="sidebarAdmin-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}