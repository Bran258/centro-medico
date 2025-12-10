import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const MisionVision = ({ image, mision, vision }) => {
  return (
    <section className="mision-vision-section">
      <Container>
        <Row className="align-items-center g-5">
          {/* Imagen */}
          <Col lg={5}>
            <div className="mision-vision-image-wrapper">
              <Image src={image} alt="Equipo médico" fluid className="img-fluid" />
            </div>
          </Col>

          {/* Texto */}
          <Col lg={7}>
            <div className="mision-vision-text">
              <div className="mb-5">
                <h2 className="mision-title">Nuestra Misión</h2>
                <p className="mision-description">{mision}</p>
              </div>
              <div>
                <h2 className="vision-title">Nuestra Visión</h2>
                <p className="vision-description">{vision}</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MisionVision;


