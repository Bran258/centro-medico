// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout";

// Client Views
import HomeView from "./view/client/home/HomeView.jsx";
import ReservarCitaView from "./view/client/reservaCita/ReservarCitaView.jsx";
import SobreNosotrosView from "./view/client/sobrenosotros/SobreNosotrosView.jsx";
import ContactanosView from "./view/client/contacto/ContactanosView.jsx";
import EspecialidadesSection from "./components/client/especialidades/EspecialidadesSection.jsx";

// Admin Layout + Vistas
import AdminLayoutView from "./layouts/AdminLayoutView.jsx";
import DashboardAdminView from "./view/admin/DashboardAdminView.jsx";
import DashboardMedicoView from "./view/medico/DashboardMedicoView.jsx";
// Rutas protegidas
import { PrivateRoutes } from "@/routers/PrivateRoutes";
import Unauthorized from "./error/Unauthorized.jsx";
import LoginView from "./view/auth/LoginView.jsx";
import PublicRoute from "./routers/PublicRoute.jsx";
import UsuariosView from "./view/admin/UsuariosView.jsx";
import PaginaNoEncontrada from "./error/404Page.jsx";
import ConsultasView from "./view/client/consultas/ConsultasView.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/login/admin"
          element={
            <PublicRoute>
              <LoginView />
            </PublicRoute>
          }
        />

        {/* PANEL ADMIN */}
        <Route
          path="/panel/admin"
          element={
            <PrivateRoutes allowed={["admin"]}>
              <AdminLayoutView />
            </PrivateRoutes>
          }
        >
          <Route index element={<DashboardAdminView />} />
          <Route path="/panel/admin/usuarios" element={<UsuariosView />} />
        </Route>

        {/* UNAUTHORIZED */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* PANEL MÉDICO */}
        <Route
          path="/panel/medico"
          element={
            <PrivateRoutes allowed={["MEDICO", "ADMIN"]}>
              <DashboardMedicoView />
            </PrivateRoutes>
          }
        />

        {/* CLIENTE */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeView />} />
          <Route path="/consultar" element={<ConsultasView />} />
          <Route path="/reservar_cita" element={<ReservarCitaView />} />
          <Route path="/sobre_nosotros" element={<SobreNosotrosView />} />
          <Route path="/contactanos" element={<ContactanosView />} />
          <Route path="/especialidades" element={<EspecialidadesSection />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<PaginaNoEncontrada />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
