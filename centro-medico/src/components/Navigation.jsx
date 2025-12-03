import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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

  // NUEVO: handler para enviar "Contacto" a /contacto#formulario
  const goToContacto = (e) => {
    // evita que el href="#contact" haga scroll a ningún lado
    e.preventDefault();
    navigate("/contacto#formulario");
  };

  return (
    <Navbar
      expand="lg"
      variant="dark"
      fixed="top"
      className="shadow-sm py-3"
      style={{
        background: "linear-gradient(90deg, #2C3E50 0%, #4B6584 100%)", // gris oscuro moderno con azul humo
      }}
    >
      <Container >
        {/* Logo y nombre */}
        <Navbar.Brand
          href="#home"
          className="d-flex align-items-center gap-4 fw-bold text-white"
        >
          <Hospital size={28} className="text-white" />
          <span className="fs-5">Centro Médico Santa Rosa</span>
        </Navbar.Brand>

        {/* Botón de colapso (móvil) */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Enlaces */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link
              onClick={() => navigate("/")}
              className="d-flex align-items-center gap-1 fw-semibold text-white px-3"
            >
              <HouseDoor size={16} /> Inicio
            </Nav.Link>
            
            <Nav.Link
              href="#about"
              className="d-flex align-items-center gap-1 fw-semibold text-white px-3"
            >
              <InfoCircle size={16} /> Quiénes Somos
            </Nav.Link>
            <Nav.Link
              href="#specialties"
              className="d-flex align-items-center gap-1 fw-semibold text-white px-3"
            >
              <JournalText size={16} /> Especialidades
            </Nav.Link>

            {/* "Contacto" EXISTENTE: ahora también navega a /contacto#formulario */}
            <Nav.Link
              href="#contact"
              onClick={goToContacto} // NUEVO
              className="d-flex align-items-center gap-1 fw-semibold text-white px-3"
            >
              <Telephone size={16} /> Contacto
            </Nav.Link>

            {/* "Contáctanos" EXISTENTE: sigue igual; /contactanos redirige a /contacto */}
            <Nav.Link
              onClick={() => navigate("/contactanos")}
              className="d-flex align-items-center gap-1 fw-semibold text-white px-3"
            >
              <Telephone size={16} /> Contáctanos
            </Nav.Link>
          </Nav>

          {/* Botón de cita */}
          <div className="d-flex align-items-center gap-3">
            <Button
              className="fw-bold d-flex align-items-center gap-2 px-4 py-2 rounded text-dark shadow border-0 bg-white bg-gradient"
              onClick={() => navigate("/reservar_cita")}
            >
              <Calendar2Check size={20} /> Reservar Cita
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
