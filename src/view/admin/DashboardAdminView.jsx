import DashboardPanels from "../../components/admin/dashboard/DashboardPanels"
import StatsSection from "../../components/admin/dashboard/StatsSection"
import PageHeader from "../../components/ui/PageHeader"

import { MdAddCircle } from "react-icons/md";   // ← ICONO AÑADIDO

import "@/styles/admin/DashboardAdminView.css"

const DashboardAdminView = () => {
  return (
    <div className="dash-root">

      <PageHeader
        title="Dashboard admin"
        subtitle="Resumen y estadísticas del centro médico"
      >
        <button className="dash-btn-primary">
          <MdAddCircle size={20} />
          Añadir Cita
        </button>
      </PageHeader>

      <StatsSection />
      <DashboardPanels />

    </div>
  )
}

export default DashboardAdminView
