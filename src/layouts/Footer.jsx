import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Hospital, Envelope, GeoAlt, Telephone } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-light text-dark pt-5 border-top">
      <Container>
        <Row className="gy-4 justify-content-between">
          {/* Logo y descripción */}
          <Col md={4}>
            <div className="d-flex align-items-center gap-4 mb-4">
              <Hospital size={28} className="text-primary" />
              <h5 className="fw-bold text-primary mb-0">
                Centro Médico Santa Rosa
              </h5>
            </div>
            <p className="text-secondary small">
              Brindamos atención médica integral con profesionales calificados
              y tecnología moderna para tu bienestar.
            </p>
          </Col>

          {/* Contacto */}
          <Col md={3}>
            <h6 className="fw-bold text-dark mb-3 text-uppercase">Contacto</h6>
            <ul className="list-unstyled text-secondary small">
              <li className="mb-2 d-flex align-items-center gap-2">
                <GeoAlt size={16} className="text-primary" />
                Av. Siempre Viva 123, Springfield
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <Telephone size={16} className="text-primary" />
                (555) 123-4567
              </li>
              <li className="d-flex align-items-center gap-2">
                <Envelope size={16} className="text-primary" />
                contacto@centrosantarosa.com
              </li>
            </ul>
          </Col>

          {/* Enlaces rápidos */}
          <Col md={3}>
            <h6 className="fw-bold text-dark mb-3 text-uppercase">
              Enlaces Rápidos
            </h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link
                  to="/sobre_nosotros"
                  className="text-secondary text-decoration-none"
                >
                  Quiénes Somos
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/especialidades"
                  className="text-secondary text-decoration-none"
                >
                  Especialidades
                </Link>
              </li>
              <li>
                <Link
                  to="/reservar_cita"
                  className="text-secondary text-decoration-none"
                >
                  Reservar Cita
                </Link>
              </li>
            </ul>
          </Col>

          {/* Legal */}
          <Col md={2}>
            <h6 className="fw-bold text-dark mb-3 text-uppercase">Legal</h6>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link
                  to="/politica-privacidad"
                  className="text-secondary text-decoration-none"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  to="/terminos-servicio"
                  className="text-secondary text-decoration-none"
                >
                  Términos de Servicio
                </Link>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="my-4" />

        {/* Copyright */}
        <Row>
          <Col className="text-center">
            <p className="small text-secondary mb-0">
              © {new Date().getFullYear()} Centro Médico Santa Rosa — Todos los
              derechos reservados.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}