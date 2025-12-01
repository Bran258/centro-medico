import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  HouseDoor,
  InfoCircle,
  JournalText,
  Calendar2Check,
  Telephone,
  Hospital,
} from "react-bootstrap-icons";

export default function Navigation() {
  const navigate = useNavigate();

  return (
    <Navbar
      expand="lg"
      variant="dark"
      fixed="top"
      className="shadow-sm py-3"
      // --- CAMBIO AQUÍ: Usamos la variable dinámica en lugar del color fijo ---
      style={{
        backgroundColor: "var(--primary-color)", // Usará el azul oscuro del logo
        borderBottom: "3px solid var(--secondary-color)", // Un toque del naranja oficial
        transition: "background-color 0.3s ease" // Suaviza el cambio de color
      }}
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-3 fw-bold text-white"
        >
          <Hospital size={28} />
          <span className="fs-5">Centro Médico Santa Rosa</span>
        </Navbar.Brand>

        {/* Toggle móvil */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Contenedor Nav */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto d-flex align-items-center gap-3">
            <Link
              to="/"
              className="d-flex align-items-center gap-1 fw-semibold text-white text-decoration-none px-3"
            >
              <HouseDoor size={16} /> Inicio
            </Link>

            <Link
              to="/sobre_nosotros" // Nota: Asegúrate que esta ruta coincida con tu App.jsx
              className="d-flex align-items-center gap-1 fw-semibold text-white text-decoration-none px-3"
            >
              <InfoCircle size={16} /> Quiénes Somos
            </Link>

            <Link
              to="/especialidades"
              className="d-flex align-items-center gap-1 fw-semibold text-white text-decoration-none px-3"
            >
              <JournalText size={16} /> Especialidades
            </Link>

            <Link
              to="/contacto"
              className="d-flex align-items-center gap-1 fw-semibold text-white text-decoration-none px-3"
            >
              <Telephone size={16} /> Contacto
            </Link>
          </Nav>

          {/* Botón Reservar Cita */}
          <div className="d-flex align-items-center gap-3">
            <Button
              className="fw-bold d-flex align-items-center gap-2 px-4 py-2 rounded text-dark shadow border-0"
              onClick={() => navigate("/reservar_cita")}
              // Opcional: Si quieres que el botón use el color SECUNDARIO del panel
              style={{
                backgroundColor: "var(--primary-color)", // Usará el azul oscuro del logo
                borderBottom: "3px solid var(--secondary-color)", // Un toque del naranja oficial
                color: "#ffffffff" // Ajusta el texto según el fondo

              }}
            >
              <Calendar2Check size={20} /> Reservar Tu Cita
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}