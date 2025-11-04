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
      style={{
        background: "linear-gradient(90deg, #2C3E50 0%, #4B6584 100%)",
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
              to="/sobre_nosotros"
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

