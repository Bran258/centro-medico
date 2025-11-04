import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../styles/HomeView.css";

const InfoCardsSection = ({ title = "Información Importante", cards = [] }) => {
  return (
    <section className="info-cards-section py-5 bg-light">
      <Container>
        <h2 className="text-center mb-5 fw-bold text-primary">{title}</h2>
        <Row className="g-4 justify-content-center">
          {cards.map((card, index) => (
            <Col key={index} md={4}>
              <Card className="h-100 shadow-lg border-0 rounded-4 text-center p-4 card-hover">
                <div className="mb-4 icon-circle bg-gradient">
                  {card.icon}
                </div>
                <Card.Title className={`fw-bold fs-4 mb-3 ${card.textColor || ""}`}>
                  {card.title}
                </Card.Title>
                <Card.Text className="text-muted">{card.text}</Card.Text>
                <Button
                  variant={card.buttonVariant}
                  className="fw-semibold mt-4 px-4 py-2 rounded-pill shadow-sm"
                  onClick={card.onClick}
                >
                  {card.buttonText}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default InfoCardsSection;
