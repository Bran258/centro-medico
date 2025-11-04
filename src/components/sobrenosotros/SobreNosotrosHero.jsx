import React from "react";
import { Container } from "react-bootstrap";

const SobreNosotrosHero = () => {
  return (
    <section className="sobre-nosotros-hero text-center">
      <Container className="py-5">
        <h1 className="fw-bold">
          Cuidando de ti y tu familia con profesionalismo y calidez
        </h1>
        <p className="lead mt-4 mx-auto" style={{ maxWidth: "700px" }}>
          Somos una familia de profesionales dedicados a brindar atención médica
          excepcional y compasiva. Nuestra historia se basa en un compromiso
          inquebrantable con el bienestar de nuestra comunidad.
        </p>
      </Container>
    </section>
  );
};

export default SobreNosotrosHero;

