import DashboardPanels from "../../components/admin/dashboard/DashboardPanels";
import StatsSection from "../../components/admin/dashboard/StatsSection";
import PageHeader from "../../components/ui/PageHeader";
import { MdAddCircle } from "react-icons/md";
import "@/styles/admin/DashboardAdminView.css";

import { Link } from "react-router-dom";
import { useDashboard } from "@/hooks/dashboard/useDashboard";

const DashboardAdminView = () => {
  const { stats, porEstado, ultimos7, proximas, loading, error, refresh } =
    useDashboard();

  return (
    <div className="dash-root">
      <PageHeader
        title="Dashboard admin"
        subtitle="Resumen y estadísticas del centro médico"
      >
        <Link className="dash-btn-primary" to="/panel/admin/gestion_citas">
          <MdAddCircle size={20} />
          Ver Citas
        </Link>
      </PageHeader>

      {loading && <p>Cargando dashboard...</p>}

      {!loading && error && (
        <div style={{ marginBottom: 16 }}>
          <p style={{ margin: 0 }}>{error}</p>
          <button className="dash-btn-primary" onClick={refresh} style={{ marginTop: 10 }}>
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          <StatsSection stats={stats} />
          <DashboardPanels porEstado={porEstado} ultimos7={ultimos7} proximas={proximas} />
        </>
      )}
    </div>
  );
};

export default DashboardAdminView;
