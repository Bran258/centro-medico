import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout";

// Vistas
import HomeView from "./view/home/HomeView.jsx";
import ReservarCitaView from "./view/reservaCita/ReservarCitaView.jsx";
import SobreNosotrosView from "./view/sobrenosotros/SobreNosotrosView.jsx";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Layout general */}
        <Route element={<MainLayout />}>

          <Route path="/" element={<HomeView />} />
          <Route path="/reservar_cita" element={<ReservarCitaView />} />
          <Route path="/sobre_nosotros" element={<SobreNosotrosView />} />

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;


