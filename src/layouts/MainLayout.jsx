import Navigation from "./Navigation";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">

      {/* Navbar */}
      <Navigation />

      {/* Contenido dinámico */}
      <main className="flex-grow-1 pt-5">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

