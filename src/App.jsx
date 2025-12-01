import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout";

// Vistas
import HomeView from "./view/home/HomeView.jsx";
import ReservarCitaView from "./view/reservaCita/ReservarCitaView.jsx";
import SobreNosotrosView from "./view/sobrenosotros/SobreNosotrosView.jsx";
import AdminSettings from "./view/admin/AdminSettings.jsx";

// import Contacto from "./view/Contacto";
// import Nosotros from "./view/Nosotros";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/reservar_cita" element={<ReservarCitaView />} />
        <Route path="/sobre_nosotros" element={<SobreNosotrosView />} />
        {/*<Route path="/contacto" element={<Contacto />} />
        <Route path="/nosotros" element={<Nosotros />} /> */}

        {/* --- RUTA DE "DESARROLLO" PARA EL DUEÑO --- */}
        {/* Cuando el dueño escriba "/admin" en la barra de dirección, verá el panel */}
        <Route path="/admin" element={<AdminSettings />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;


