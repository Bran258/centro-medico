import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { campaigns } from '../constants/campaingsData';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SeasonalPromo = () => {
    const { currentCampaign } = useContext(ThemeContext);
    const navigate = useNavigate();

    const campaignKey = currentCampaign || 'lluvias';
    const data = campaigns[campaignKey] || campaigns['default'];

    if (!data.cards || data.cards.length === 0) return null;

    return (
        <section
            style={{
                background: data.bgGradient || data.bgColor,
                padding: '70px 0',
            }}
        >
            <Container>
                {/* Encabezado */}
                <div className="text-center mb-5">
                    <h2
                        className="fw-bold"
                        style={{
                            color: data.titleColor,
                            fontSize: '2.4rem',
                            marginBottom: '10px',
                            letterSpacing: '-0.5px'
                        }}
                    >
                        {data.title}
                    </h2>
                    <p
                        className="fs-5"
                        style={{
                            color: '#5e6a74',
                            maxWidth: '700px',
                            margin: '0 auto'
                        }}
                    >
                        {data.subtitle}
                    </p>
                </div>

                {/* Tarjetas */}
                <Row className="justify-content-center">
                    {data.cards.map((card, index) => (
                        <Col key={index} md={6} lg={4} className="mb-4">
                            <Card
                                className="h-100 shadow-sm border-0"
                                style={{
                                    borderRadius: '18px',
                                    overflow: 'hidden',
                                    background: '#ffffff',
                                    boxShadow:
                                        '0 6px 18px rgba(0, 0, 0, 0.08)',
                                    transition: 'transform 0.25s ease',
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.transform =
                                        'translateY(-6px)')
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.transform =
                                        'translateY(0)')
                                }
                            >
                                {/* ICONO */}
                                <div
                                    style={{
                                        background: card.highlight
                                            ? '#d9534f'
                                            : '#f1f7ff',
                                        padding: '22px 0',
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '75px',
                                            height: '75px',
                                            borderRadius: '50%',
                                            background: 'white',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            boxShadow:
                                                '0 4px 12px rgba(0,0,0,0.1)',
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontSize: '2.4rem',
                                                color: card.highlight
                                                    ? 'red'
                                                    : '#0d6efd',
                                            }}
                                        >
                                            {card.icon}
                                        </span>
                                    </div>
                                </div>

                                <Card.Body className="text-center p-4">
                                    {/* Título */}
                                    <Card.Title
                                        className="fw-bold mb-3"
                                        style={{
                                            fontSize: '1.35rem',
                                            color: '#0b4a6f',
                                        }}
                                    >
                                        {card.title}
                                    </Card.Title>

                                    {/* Descripción */}
                                    <Card.Text
                                        style={{
                                            color: '#6e7a85',
                                            fontSize: '0.95rem',
                                            minHeight: '70px',
                                        }}
                                        className="mb-4"
                                    >
                                        {card.desc}
                                    </Card.Text>

                                    {/* Botón */}
                                    <Button
                                        size="lg"
                                        className="w-100 rounded-pill"
                                        variant={
                                            card.highlight
                                                ? 'danger'
                                                : 'primary'
                                        }
                                        style={{
                                            padding: '12px 0',
                                            fontWeight: '600',
                                            letterSpacing: '0.3px',
                                        }}
                                        onClick={() => navigate('/reservar_cita')}
                                    >
                                        {card.btnText}
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default SeasonalPromo;
