import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";
import "@/styles/layout/AdminLayoutView.css";
import AdminNavigation from "@/components/ui/AdminNavigation";
import SidebarAsistente from "../components/ui/SidebarAsistente";

export default function AsistenteLayoutView() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login/admin");
  };

  return (
    <div className="admin-layout">
      <AdminNavigation onLogout={handleLogout} />

      {/* SIDEBAR + CONTENIDO */}
      <div className="admin-layout-body">
        <div className="admin-sidebar-space">
          <SidebarAsistente />
        </div>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}