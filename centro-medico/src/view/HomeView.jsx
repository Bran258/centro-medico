import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { PeopleFill, Calendar3, GeoAltFill, Calendar2Check } from "react-bootstrap-icons";
import "../styles/HomeView.css";
import InfoCardsSection from "../components/InfoCardsSection";
import { useNavigate } from "react-router-dom";

export default function HomeView() {
      const infoCards = [
        {
        icon: <PeopleFill size={55} className="text-primary" />,
        title: "Nuestro Personal",
        text: "Conoce a nuestro equipo de especialistas altamente capacitados y comprometidos con tu bienestar integral.",
        bgColor: "bg-primary",
        textColor: "text-primary",
        buttonVariant: "primary",
        buttonText: "Conocer al Equipo",
        },
        {
        icon: <Calendar3 size={55} className="text-success" />,
        title: "Reserva tu Cita",
        text: "Agenda fácilmente tu cita médica en línea y recibe atención sin esperas. Rápido, cómodo y seguro.",
        bgColor: "bg-success",
        textColor: "text-success",
        buttonVariant: "success",
        buttonText: "Reservar Ahora",
        textWhite: true,
        },
        {
        icon: <GeoAltFill size={55} className="text-info" />,
        title: "Contacto y Ubicación",
        text: "Encuentra nuestra ubicación, horarios de atención y canales de contacto. ¡Estamos para ayudarte!",
        bgColor: "bg-info",
        textColor: "text-info",
        buttonVariant: "outline-info",
        buttonText: "Contáctanos",
        },
    ];

    const navigate = useNavigate();

    // NUEVO: conectar los botones de las cards
    infoCards[1].onClick = () => navigate("/reservar_cita");           // "Reserva tu Cita"
    infoCards[2].onClick = () => navigate("/contacto#formulario");     // "Contacto y Ubicación" → formulario

  return (
    <main
      className="bg-white"
      style={{
        marginLeft: "166px",
        marginRight: "166px",
      }}
    >
      {/* Hero Section */}
      <div
        className="text-white d-flex align-items-center text-start border-radius-3"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuC2mvuJpLLY-qXOce06r2Ur_RjZqJfGY1r0EcAfXyST2zHpZyDaQNviS40j-XkmgssoBuvHGcGgHCzc1s406fxSjDp75HIKmD0CC2FtzUbEbfDTkBFr_o4pbWRDruOh13kxec4z5MV6_dgR6N9IqT33m39Pv18bcGIMQ_UlDfpxFZFpF9FCRlaZg1VnFN76dtuYMNCTe9p5oDQz7Gchf6QT24AUbrG2J-chtM--fCyW6IRyQeeBONBBdi8vNmbQ7993_X-3hwhAeV0")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "520px",
          padding: "80px 20px",
          marginTop: "120px",
          borderRadius: "15px",
        }}
      >
        <Container>
          <Col md={8} lg={6}>
            <h1 className="fw-bold display-4 mb-3 text-shadow">
              Centro Médico Santa Rosa
            </h1>
            <h2 className="fs-4 mb-4 fw-normal text-light">
              Cuidando de ti y tu familia con profesionalismo y calidez.
            </h2>

            <Button
              className="fw-bold d-flex align-items-center gap-3 px-4 py-3 rounded text-dark shadow border-0 bg-white bg-gradient"
              onClick={() => navigate("/reservar_cita")}
            >
              <Calendar2Check size={20} /> Reservar Cita ahora
            </Button>
            
          </Col>
        </Container>
      </div>

    {/* Bienvenida */}
    <section
    className="text-center bg-white"
    style={{
        padding: "60px 0",
        marginTop: "60px", // separación de 80px desde el Hero Section
    }}
    >
    <Container>
        <h2
        className="fw-bold mb-3"
        style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "2.5rem",
            color: "#000000ff", // azul Bootstrap para un tono profesional
        }}
        >
        Bienvenido a nuestro Centro Médico
        </h2>

        <div
        className="mx-auto"
        style={{
            width: "16rem",
            height: "4px",
            backgroundColor: "#0d6efd",
            borderRadius: "2px",
            marginBottom: "40px",
        }}
        ></div>

        <p
        className="text-secondary mx-auto"
        style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: "1.125rem",
            lineHeight: "1.8",
            maxWidth: "750px",
        }}
        >
        En el <strong>Centro Médico Santa Rosa</strong>, nuestra misión es brindar
        atención médica integral y de alta calidad, centrada en las necesidades
        del paciente. Promovemos el <strong>profesionalismo</strong>, la{" "}
        <strong>calidez humana</strong> y el{" "}
        <strong>compromiso con la salud</strong> de toda nuestra comunidad.
        </p>
    </Container>
    </section>

    {/* Tarjetas informativas mejoradas con círculos perfectos */}
      <InfoCardsSection
        title="Conoce Más Sobre Nosotros"
        cards={infoCards}
      />
    </main>
  );
}
