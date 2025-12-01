import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { campaigns } from '../constants/campaingsData';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SeasonalPromo = () => {
    const { currentCampaign } = useContext(ThemeContext);
    const navigate = useNavigate();

    // Si no carga la campaña, usa 'lluvias' como prueba por defecto para que lo veas YA
    const campaignKey = currentCampaign || 'lluvias';
    const data = campaigns[campaignKey] || campaigns['default'];

    // Si no hay tarjetas (caso default vacío), no mostramos nada
    if (!data.cards || data.cards.length === 0) return null;

    return (
        <div style={{ backgroundColor: data.bgColor, padding: '60px 0' }}>
            <Container>
                {/* Encabezado de la Sección */}
                <div className="text-center mb-5">
                    <h2 className="fw-bold" style={{ color: data.titleColor, fontSize: '2rem' }}>
                        {data.title}
                    </h2>
                    <p className="fs-5 text-secondary">{data.subtitle}</p>
                </div>

                {/* Tarjetas de Servicios */}
                <Row className="justify-content-center">
                    {data.cards.map((card, index) => (
                        <Col key={index} md={6} lg={4} className="mb-4">
                            <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                                <div className={`card-header text-center py-3 ${card.highlight ? 'bg-danger text-white' : 'bg-light'}`}>
                                    <span style={{ fontSize: '3rem' }}>{card.icon}</span>
                                </div>
                                <Card.Body className="text-center p-4">
                                    <Card.Title className="fw-bold fs-4 mb-3">{card.title}</Card.Title>
                                    <Card.Text className="text-muted mb-4">
                                        {card.desc}
                                    </Card.Text>
                                    <Button
                                        variant={card.highlight ? "outline-danger" : "outline-primary"}
                                        size="lg"
                                        className="w-100 rounded-pill"
                                        onClick={() => navigate('/reserva')}
                                    >
                                        {card.btnText}
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default SeasonalPromo;