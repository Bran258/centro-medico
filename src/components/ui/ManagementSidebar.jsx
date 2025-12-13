import { NavLink } from "react-router-dom";
import { MdDashboard, MdPeople, MdSettings } from "react-icons/md";
import "@/styles/ui/ManagementSidebar.css";

const menuItems = [
  { label: "Dashboard", icon: <MdDashboard />, path: "/panel/admin" },
  { label: "Usuarios", icon: <MdPeople />, path: "/panel/admin/usuarios" },
  { label: "Configuración", icon: <MdSettings />, path: "/panel/admin/config" },
];

export default function ManagementSidebar() {
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
