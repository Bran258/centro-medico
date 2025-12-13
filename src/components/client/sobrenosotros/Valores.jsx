import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Valores = ({ valores }) => {
  return (
    <section className="valores-section">
      <Container>
        <h2 className="valores-title text-center mb-5">
          Nuestros Valores Fundamentales
        </h2>

        <Row className="g-4 justify-content-center">
          {valores.map((valor, idx) => (
            <Col key={idx} sm={6} md={4} lg={3}>
              <Card className="valor-card text-center h-100 p-4">
                {/* Icono directamente */}
                <div className="valor-icon">
                  {valor.icon}
                </div>

                {/* Contenido */}
                <Card.Body>
                  <Card.Title className="valor-title">{valor.title}</Card.Title>
                  <Card.Text className="valor-description">{valor.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Valores;



