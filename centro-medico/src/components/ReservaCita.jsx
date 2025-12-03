// components/ReservaCita.jsx
import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { Calendar2Check } from "react-bootstrap-icons";

export default function ReservaCita({ datos, onChange, onConfirm }) {
  const diasSemana = ["L", "M", "M", "J", "V", "S", "D"]; 

  return (
    <main className="flex-1 py-5" style={{ background: "#f4f6fb", marginTop: "77px" }}>
      <Container className="py-4">
        {/* Título */}
        <Row className="mb-4 text-center text-lg-start">
          <Col>
            <h1 className="fw-bold text-dark display-5">Reserva tu Cita</h1>
            <p className="text-muted fs-6">
              Selecciona la especialidad, la fecha y la hora que mejor te convenga.
            </p>
          </Col>
        </Row>

        <Card className="p-4 shadow-lg border-0 rounded-4 bg-white">
          <Row className="g-5">
            {/* Formulario */}
            <Col lg={6}>
              <Form>
                {/* Nombre */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Nombre Completo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Introduce tu nombre y apellido"
                    value={datos.nombre}
                    onChange={(e) => onChange("nombre", e.target.value)}
                    className="shadow-sm"
                    style={{
                      height: "50px",
                      borderRadius: "12px",
                      border: "1px solid #d1d9e6",
                      background: "#fdfdfd",
                      padding: "0.5rem 1rem",
                    }}
                  />
                </Form.Group>

                {/* Especialidad */}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">Especialidad</Form.Label>
                  <Form.Select
                    value={datos.especialidad}
                    onChange={(e) => onChange("especialidad", e.target.value)}
                    className="shadow-sm"
                    style={{
                      height: "50px",
                      borderRadius: "12px",
                      border: "1px solid #d1d9e6",
                      background: "#fdfdfd",
                      padding: "0.5rem 1rem",
                    }}
                  >
                    <option value="">Selecciona una especialidad</option>
                    <option value="Cardiología">Cardiología</option>
                    <option value="Dermatología">Dermatología</option>
                    <option value="Pediatría">Pediatría</option>
                    <option value="Ginecología">Ginecología</option>
                  </Form.Select>
                </Form.Group>

                {/* Horarios */}
                <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">Selecciona un Horario</Form.Label>
                <div className="d-flex flex-wrap gap-2">
                    {datos.horarios.map((hora, idx) => (
                    <Button
                        key={idx}
                        variant={hora.value === datos.horaSeleccionada ? "primary" : "outline-secondary"}
                        disabled={hora.disabled}
                        onClick={() => onChange("horaSeleccionada", hora.value)}
                        className="rounded-pill shadow-sm text-truncate"
                        style={{
                        flex: "1 1 30%",
                        padding: "0.5rem 0",
                        background:
                            hora.value === datos.horaSeleccionada
                            ? "linear-gradient(135deg, #4a90e2, #50e3c2)"
                            : "#f8f9fa",
                        color: hora.value === datos.horaSeleccionada ? "#fff" : "#495057",
                        border: "1px solid #d1d9e6",
                        transition: "all 0.2s ease",
                        }}
                    >
                        {hora.value}
                    </Button>
                    ))}
                </div>
                </Form.Group>


                {/* Botón Confirmar */}
                <Button
                  className="mt-4 w-100 py-2 fw-bold shadow-lg d-flex justify-content-center align-items-center gap-2"
                  style={{
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #4a90e2, #50e3c2)",
                    border: "none",
                    fontSize: "1rem",
                  }}
                  onClick={onConfirm}
                >
                  <Calendar2Check size={20} /> Confirmar Cita
                </Button>
              </Form>
            </Col>

            {/* Calendario Moderno */}
            <Col lg={6}>
              <Form.Group>
                <Form.Label className="fw-semibold mb-3">Elige una Fecha</Form.Label>

                <div
                  className="p-4 shadow-sm rounded-4 bg-white"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    border: "1px solid #d1d9e6",
                  }}
                >
                  {/* Navegación Mes */}
                  <div className="d-flex justify-content-between align-items-center w-100 mb-4">
                    <Button
                      variant="light"
                      onClick={() => onChange("mesAnterior")}
                      className="shadow-sm border-0"
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        fontWeight: "bold",
                        background: "#e0e7ff",
                        color: "#4a90e2",
                      }}
                    >
                      &lt;
                    </Button>
                    <span className="fw-bold text-primary">{datos.mesActual}</span>
                    <Button
                      variant="light"
                      onClick={() => onChange("mesSiguiente")}
                      className="shadow-sm border-0"
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        fontWeight: "bold",
                        background: "#e0e7ff",
                        color: "#4a90e2",
                      }}
                    >
                      &gt;
                    </Button>
                  </div>

                  {/* Días de la semana */}
                  <div
                    className="d-grid gap-2 w-100 mb-2"
                    style={{ gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center" }}
                  >
                    {diasSemana.map((d, idx) => (
                      <div
                        key={idx}
                        className="d-flex justify-content-center align-items-center"
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "12px",
                          fontWeight: "600",
                          color: "#6c757d",
                        }}
                      >
                        {d}
                      </div>
                    ))}
                  </div>

                  {/* Fechas */}
                  <div
                    className="d-grid gap-2 w-100"
                    style={{ gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center" }}
                  >
                    {datos.fechas.map((fecha, idx) => {
                      const isToday = new Date().getDate() === fecha.value && !fecha.disabled;
                      return (
                        <Button
                          key={idx}
                          disabled={fecha.disabled}
                          className={`shadow-sm border-0 ${fecha.selected ? "text-white" : "text-dark"}`}
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "12px",
                            fontWeight: "500",
                            background: fecha.selected
                              ? "linear-gradient(135deg, #4a90e2, #50e3c2)"
                              : isToday
                              ? "#d0e7ff"
                              : "#f8f9fa",
                            border: "1px solid #d1d9e6",
                            transition: "all 0.2s ease",
                          }}
                          onClick={() => onChange("fechaSeleccionada", fecha.value)}
                          onMouseEnter={(e) => {
                            if (!fecha.selected && !fecha.disabled) e.currentTarget.style.background = "#e0e7ff";
                          }}
                          onMouseLeave={(e) => {
                            if (!fecha.selected && !fecha.disabled) e.currentTarget.style.background = isToday ? "#d0e7ff" : "#f8f9fa";
                          }}
                        >
                          {fecha.value}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Card>
      </Container>
    </main>
  );
}


