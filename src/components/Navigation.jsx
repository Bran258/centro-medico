import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import * as bootstrap from "bootstrap"; // Necesario para cerrar el menú por JS
import { Link } from "react-router-dom";
import "../styles/Navigation.css";

import { FaClinicMedical } from "react-icons/fa";
import { MdMenu, MdHome, MdMedicalServices, MdGroups, MdCall } from "react-icons/md";

export default function Navigation() {

  // Cierra el menú móvil después de hacer click en cualquier link
  const closeMobileMenu = () => {
    const menu = document.getElementById("mobileMenu");
    if (menu && menu.classList.contains("show")) {
      const collapse = new bootstrap.Collapse(menu);
      collapse.hide();
    }
  };

  return (
    <header className="nav-header bg-light dark:bg-dark shadow-sm sticky-top">
      <div className="container-fluid px-4 px-lg-5 d-flex align-items-center justify-content-between border-bottom nav-container">

        {/* Logo + Título */}
        <div className="d-flex align-items-center gap-3 nav-left">
          <FaClinicMedical className="nav-icon" />
          <h2 className="m-0 nav-title">Centro Médico Santa Rosa</h2>
        </div>

        {/* Desktop Menu */}
        <nav className="d-none d-md-flex gap-4 nav-menu">
          <Link to="/" className="nav-link-custom d-flex align-items-center gap-1">
            <MdHome size={18} /> Inicio
          </Link>

          <Link to="/especialidades" className="nav-link-custom d-flex align-items-center gap-1">
            <MdMedicalServices size={18} /> Especialidades
          </Link>

          <Link to="/sobre_nosotros" className="nav-link-custom d-flex align-items-center gap-1">
            <MdGroups size={18} /> Sobre Nosotros
          </Link>

          <Link to="/contactanos" className="nav-link-custom d-flex align-items-center gap-1">
            <MdCall size={18} /> Contacto
          </Link>
        </nav>

        {/* Botones */}
        <div className="d-flex align-items-center gap-3 nav-right">

          {/* Botón solo en desktop */}
          <Link
            to="/reservar_cita"
            className="btn btn-reservar fw-bold btn-sm px-3 d-none d-md-inline-flex"
          >
            Reservar Cita
          </Link>

          {/* Botón Hamburguesa visible SOLO en móvil */}
          <button
            className="btn d-md-none nav-menu-btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mobileMenu"
          >
            <MdMenu size={26} />
          </button>

        </div>
      </div>

      {/* Menú móvil colapsable */}
      <div id="mobileMenu" className="collapse bg-light dark:bg-dark border-top mobile-nav-menu">

        <Link
          to="/"
          className="mobile-nav-link d-flex align-items-center gap-2"
          onClick={closeMobileMenu}
        >
          <MdHome size={20} /> Inicio
        </Link>

        <Link
          to="/especialidades"
          className="mobile-nav-link d-flex align-items-center gap-2"
          onClick={closeMobileMenu}
        >
          <MdMedicalServices size={20} /> Especialidades
        </Link>

        <Link
          to="/sobre_nosotros"
          className="mobile-nav-link d-flex align-items-center gap-2"
          onClick={closeMobileMenu}
        >
          <MdGroups size={20} /> Sobre Nosotros
        </Link>

        <Link
          to="/contactanos"
          className="mobile-nav-link d-flex align-items-center gap-2"
          onClick={closeMobileMenu}
        >
          <MdCall size={20} /> Contacto
        </Link>

        {/* Botón Reservar Cita en móvil */}
        <Link
          to="/reservar_cita"
          className="mobile-nav-link d-flex align-items-center gap-2"
          onClick={closeMobileMenu}
        >
          🗓️ Reservar Cita
        </Link>

      </div>
    </header>
  );
}
