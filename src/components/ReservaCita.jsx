// components/ReservaCita.jsx
import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Calendar2Check } from "react-bootstrap-icons";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { es } from "date-fns/locale";


export default function ReservaCita({ datos, onChange, onConfirm }) {
  const opciones = [
    "Consulta general",
    "Chequeo médico",
    "Atención para niños",
    "Atención para mujeres",
    "Cuidado de la piel",
    "Salud del corazón",
    "Consulta por malestar leve",
  ];

  return (
    <main className="reserva-main">
      <Container className="py-4">
        <Row className="mb-4 text-center text-lg-start">
          <Col>
            <h1 className="fw-bold text-dark display-5">Reserva tu Cita</h1>
            <p className="text-muted fs-6">
              Selecciona el tipo de atención, la fecha y la hora que mejor te convenga.
            </p>
          </Col>
        </Row>

        <Card className="p-4 shadow-lg border-0 rounded-4 bg-white">
          <Row className="g-5">
            {/* FORMULARIO */}
            <Col lg={6}>
              <Form>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Nombre Completo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Introduce tu nombre y apellido"
                    value={datos.nombre}
                    onChange={(e) => onChange("nombre", e.target.value)}
                    className="reserva-input"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Tipo de Atención</Form.Label>
                  <Form.Select
                    value={datos.especialidad}
                    onChange={(e) => onChange("especialidad", e.target.value)}
                    className="reserva-input"
                  >
                    <option value="">Selecciona una opción</option>
                    {opciones.map((op, i) => (
                      <option key={i} value={op}>
                        {op}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* HORARIOS */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Selecciona un Horario</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {datos.horarios.map((hora, idx) => (
                      <Button
                        key={idx}
                        variant={
                          hora.value === datos.horaSeleccionada
                            ? "primary"
                            : "outline-secondary"
                        }
                        disabled={hora.disabled}
                        onClick={() => onChange("horaSeleccionada", hora.value)}
                        className={`reserva-hora ${
                          hora.value === datos.horaSeleccionada
                            ? "reserva-hora-activa"
                            : ""
                        }`}
                      >
                        {hora.value}
                      </Button>
                    ))}
                  </div>
                </Form.Group>

                <Button
                  className="reserva-btn px-4 py-2"
                  onClick={onConfirm}
                  variant="primary"
                >
                  <Calendar2Check size={20} className="me-2" />
                  Confirmar Cita
                </Button>
              </Form>
            </Col>

            {/* CALENDARIO */}
            <Col
              lg={6}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <Form.Group className="w-100 text-center">
                <Form.Label className="fw-semibold mb-3 fs-5">
                  Elige una Fecha
                </Form.Label>

                <div className="reserva-calendario">
                  <DayPicker
                    mode="single"
                    required
                    locale={es}
                    selected={datos.fechaSeleccionada}
                    onSelect={(value) => onChange("fechaSeleccionada", value)}
                    fromDate={new Date()} // no permite fechas pasadas
                  />
                </div>

                {/* Mostrar fecha seleccionada */}
                {datos.fechaSeleccionada && (
                  <p className="mt-3 fw-semibold text-primary">
                    Has seleccionado:{" "}
                    {datos.fechaSeleccionada.toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
              </Form.Group>
            </Col>
          </Row>
        </Card>
      </Container>
    </main>
  );
}
