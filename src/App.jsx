import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

// Importa tus vistas
import HomeView from "./view/home/HomeView.jsx";
import ReservarCitaView from "./view/reservaCita/ReservarCitaView.jsx";
import SobreNosotrosView from "./view/sobrenosotros/SobreNosotrosView.jsx";
import AdminSettings from "./view/admin/AdminSettings.jsx";

// import Contacto from "./view/Contacto";
// import Nosotros from "./view/Nosotros";

function App() {
  return (
    <BrowserRouter>
      <Navigation />

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

      <Footer />
    </BrowserRouter>
  );
}

export default App;

