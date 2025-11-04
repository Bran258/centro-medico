import React from "react";
import { PeopleFill, Calendar3, GeoAltFill } from "react-bootstrap-icons";

export default function getInfoCards(navigate) {
  return [
    {
      icon: <PeopleFill size={55} className="text-primary" />,
      title: "Nuestro Personal",
      text: "Conoce a nuestro equipo de especialistas altamente capacitados y comprometidos con tu bienestar integral.",
      textColor: "text-primary",
      buttonVariant: "secondary",
      buttonText: "Próximamente",
      onClick: () => {}, // Desactivado por ahora
    },
    {
      icon: <Calendar3 size={55} className="text-success" />,
      title: "Reserva tu Cita",
      text: "Agenda fácilmente tu cita médica en línea y recibe atención sin esperas. Rápido, cómodo y seguro.",
      textColor: "text-success",
      buttonVariant: "success",
      buttonText: "Reservar Ahora",
      onClick: () => navigate("/reservar_cita"),
    },
    {
      icon: <GeoAltFill size={55} className="text-info" />,
      title: "Contacto y Ubicación",
      text: "Encuentra nuestra ubicación, horarios de atención y canales de contacto. ¡Estamos para ayudarte!",
      textColor: "text-info",
      buttonVariant: "secondary",
      buttonText: "Próximamente",
      onClick: () => {}, // Desactivado por ahora
    },
  ];
}

