import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout";

// Vistas
import HomeView from "./view/home/HomeView.jsx";
import ReservarCitaView from "./view/reservaCita/ReservarCitaView.jsx";
import SobreNosotrosView from "./view/sobrenosotros/SobreNosotrosView.jsx";
import AdminSettings from "./view/admin/AdminSettings.jsx";
import ContactanosView from "./view/contacto/ContactanosView.jsx";
import EspecialidadesSection from "./components/especialidades/EspecialidadesSection.jsx";
import ConsultasView from "./view/consultas/ConsultasView.jsx";
// Importamos el Guardian de seguridad (Asegurate que la ruta coincida donde creaste el archivo)
import AdminGuard from "./components/auth/AdminGuard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- RUTAS PRINCIPALES CON LAYOUT --- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomeView />} />
          <Route path="/consultar" element={<ConsultasView />} />
          <Route path="/reservar_cita" element={<ReservarCitaView />} />
          <Route path="/sobre_nosotros" element={<SobreNosotrosView />} />
          <Route path="/contactanos" element={<ContactanosView />} />
          <Route path="/especialidades" element={<EspecialidadesSection />} />
        </Route>

        {/* --- RUTA PROTEGIDA DE ADMIN --- */}
        <Route
          path="/admin"
          element={
            // Aquí envolvemos el AdminSettings con el AdminGuard
            <AdminGuard>
              <AdminSettings />
            </AdminGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;