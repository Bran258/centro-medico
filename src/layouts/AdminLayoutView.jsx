import { Outlet, useNavigate } from "react-router-dom";
import ManagementNavigation from "@/components/ui/ManagementNavigation";
import { useAuth } from "@/hooks/auth/useAuth";
import "@/styles/layout/AdminLayoutView.css";
import ManagementSidebar from "@/components/ui/ManagementSidebar";

export default function AdminLayoutView() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login/admin");
  };

  return (
    <div className="admin-layout">
      {/* TOPBAR */}
      <ManagementNavigation onLogout={handleLogout} />

      {/* SIDEBAR + CONTENIDO */}
      <div className="admin-layout-body">
        
        <div className="admin-sidebar-space">
          <ManagementSidebar />
        </div>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

