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


// import Contacto from "./view/Contacto";
// import Nosotros from "./view/Nosotros";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* --- RUTAS PRINCIPALES CON LAYOUT --- */}
        <Route element={<MainLayout />}>

          <Route path="/" element={<HomeView />} />
          <Route path="/reservar_cita" element={<ReservarCitaView />} />
          <Route path="/sobre_nosotros" element={<SobreNosotrosView />} />
          <Route path="/contactanos" element={<ContactanosView />} />
          <Route path="/especialidades" element={< EspecialidadesSection />} />
         

        </Route>

        {/* --- RUTA DE "DESARROLLO" PARA EL DUEÑO --- */}
        {/* Cuando el dueño escriba "/admin" en la barra de dirección, verá el panel */}
        <Route path="/admin" element={<AdminSettings />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;


