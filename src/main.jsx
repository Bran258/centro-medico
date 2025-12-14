import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

/* --- TUS ESTILOS ORIGINALES (MANTENERLOS) --- */
import "./index.css";
import './styles/SobreNosotros.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./styles/PeruvianHolidays.css";

import App from "./App.jsx";

/* --- LO NUEVO: IMPORTAR EL PROVEEDOR DE TEMAS --- */
// Asegúrate de que la ruta coincida con donde creaste el archivo
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from "./context/AuthContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Envolvemos la App con el ThemeProvider para que tenga acceso a los colores */}
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);