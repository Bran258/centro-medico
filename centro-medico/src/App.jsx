// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

// Vistas
import HomeView from "./view/HomeView";
import ReservarCitaView from "./view/ReservarCitaView";

// Componentes
import Contactanos from "./components/Contactanos"; // <- tu página de contacto (la que conservarás)

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/reservar_cita" element={<ReservarCitaView />} />

        {/* Ruta canónica de contacto */}
        <Route path="/contacto" element={<Contactanos />} />

        {/* Alias/redirect para enlaces antiguos */}
        <Route path="/contactanos" element={<Navigate to="/contacto" replace />} />

        {/* (Opcional) cualquier otra ruta redirige al inicio */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
