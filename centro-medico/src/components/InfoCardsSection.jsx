import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../styles/HomeView.css";

export default function InfoCardsSection({ title, cards }) {
  return (
    <section
      className="py-5 bg-gradient"
      style={{ background: "linear-gradient(180deg, #f8fbff 0%, #eaf3ff 100%)" }}
    >
      <Container>
        <h2 className="text-center fw-bold text-primary mb-5">{title}</h2>

        <Row className="g-4 justify-content-center">
          {cards.map((card, index) => (
            <Col xs={12} md={6} lg={4} key={index}>
              <Card
                className="text-center border-0 shadow-lg h-100 rounded-4 card-hover"
                style={{
                  transition: "transform 0.3s, box-shadow 0.3s",
                  minHeight: "480px",
                }}
              >
                <Card.Body className="p-5 d-flex flex-column justify-content-between">
                  <div>
                    <div
                      className={`icon-circle ${card.bgColor} bg-opacity-10 shadow-sm mx-auto mb-4 d-flex justify-content-center align-items-center`}
                      style={{
                        width: "110px",
                        height: "110px",
                        borderRadius: "50%",
                      }}
                    >
                      {card.icon}
                    </div>
                    <Card.Title className={`fw-bold ${card.textColor} fs-4`}>
                      {card.title}
                    </Card.Title>
                    <Card.Text className="text-secondary mt-3 fs-5 lh-base">
                      {card.text}
                    </Card.Text>
                  </div>
                  <Button
                    variant={card.buttonVariant}
                    className={`fw-semibold mt-4 px-4 py-2 rounded-pill shadow-sm ${
                      card.textWhite ? "text-white" : ""
                    }`}
                  >
                    {card.buttonText}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
