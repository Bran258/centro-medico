import React from "react";
import { Container, Col, Button } from "react-bootstrap";
import { Calendar2Check } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import InfoCardsSection from "../../components/InfoCardsSection.jsx";
import getInfoCards from "../../hooks/useInfoCards.jsx";

export default function HomeView() {
  const navigate = useNavigate();
  const infoCards = getInfoCards(navigate);

  return (
    <main className="home-container bg-white">
      {/* Hero Section */}
      <section className="hero-section text-white d-flex align-items-center text-start">
        <Container>
          <Col md={8} lg={6}>
            <h1 className="fw-bold display-4 mb-3 text-shadow">
              Centro Médico Santa Rosa
            </h1>
            <h2 className="fs-4 mb-4 fw-normal text-light">
              Cuidando de ti y tu familia con profesionalismo y calidez.
            </h2>
            <Button
              className="fw-bold d-flex align-items-center gap-3 px-4 py-3 rounded shadow border-0 bg-white text-dark"
              onClick={() => navigate("/reservar_cita")}
            >
              <Calendar2Check size={20} /> Reservar cita ahora
            </Button>
          </Col>
        </Container>
      </section>

      {/* Bienvenida */}
      <section className="text-center bg-white bienvenida-section">
        <Container>
          <h2 className="fw-bold mb-3 bienvenida-titulo">
            Bienvenido a nuestro Centro Médico
          </h2>
          <div className="separador mx-auto mb-4"></div>
          <p className="text-secondary mx-auto bienvenida-texto">
            En el <strong>Centro Médico Santa Rosa</strong>, nuestra misión es
            brindar atención médica integral y de alta calidad, centrada en las
            necesidades del paciente. Promovemos el <strong>profesionalismo</strong>, la{" "}
            <strong>calidez humana</strong> y el <strong>compromiso con la salud</strong> de
            toda nuestra comunidad.
          </p>
        </Container>
      </section>

      {/* Tarjetas informativas */}
      <InfoCardsSection title="Conoce Más Sobre Nosotros" cards={infoCards} />
    </main>
  );
}

