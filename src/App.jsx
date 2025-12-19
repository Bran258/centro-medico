import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Layout
import MainLayout from "./layouts/MainLayout";
import AdminLayoutView from "./layouts/AdminLayoutView.jsx";

// Client Views
import HomeView from "./view/client/home/HomeView.jsx";
import ReservarCitaView from "./view/client/reservaCita/ReservarCitaView.jsx";
import SobreNosotrosView from "./view/client/sobrenosotros/SobreNosotrosView.jsx";
import ContactanosView from "./view/client/contacto/ContactanosView.jsx";
import EspecialidadesSection from "./components/client/especialidades/EspecialidadesSection.jsx";
import ConsultasView from "./view/client/consultas/ConsultasView.jsx";

// Admin Views
import DashboardAdminView from "./view/admin/DashboardAdminView.jsx";


import PerfinView from "./view/admin/perfil/PerfinView.jsx";
import NotificacionesView from "./view/admin/notificaciones/NotificacionesView.jsx";

import UsuariosView from "./view/admin/usuarios/UsuariosView.jsx";
import Medicos from "./view/admin/medicos/Medicos.jsx";
import EspecialidadesView from "./view/admin/especialidades/EspecialidadesView.jsx";

// Auth / Guards
import { PrivateRoutes } from "@/routers/PrivateRoutes";
import PublicRoute from "./routers/PublicRoute.jsx";
import LoginView from "./view/auth/LoginView.jsx";

// Errors
import Unauthorized from "./error/Unauthorized.jsx";
import PaginaNoEncontrada from "./error/404Page.jsx";
import Pendiente from "./components/admin/usuarios/Pendiente.jsx";
import AdminSettings from "./view/admin/AdminSettings.jsx";
import CitasView from "./view/admin/citas/CitasView.jsx";





function App() {
  return (
    <AuthProvider>
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
            <Route path="perfil" element={<PerfinView />} />

            <Route path="usuarios" element={<UsuariosView />} />
            <Route path="medicos" element={<Medicos />} />
            <Route path="especialidades" element={<EspecialidadesView />} />
            <Route path="campañas" element={<AdminSettings />} />
            <Route path="gestion_citas" element={<CitasView />} />
            
          </Route>

          {/* UNAUTHORIZED */}
          <Route path="/pendiente" element={<Pendiente />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

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
    </AuthProvider>
  );
}

export default App;
