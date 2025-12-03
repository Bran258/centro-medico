// src/components/EspecialidadesSection.jsx
import React from "react";
import "../../styles/especialidades/EspecialidadesSection.css";

import { 
  FaChild, 
  FaHeartbeat, 
  FaUserMd, 
  FaFemale, 
  FaBone, 
  FaBrain, 
  FaEye, 
  FaTint 
} from "react-icons/fa";

export default function EspecialidadesSection() {
  return (
    <div className="container especialidades-section-container">

      {/* Encabezado */}
      <div className="text-center mb-5">
        <span className="text-primary fw-bold small">Nuestros Servicios</span>
        <h1 className="text-dark dark-text-white display-4 fw-bold mt-2">
          Especialidades Médicas
        </h1>
        <p className="text-muted mx-auto mt-3 fs-5 w-75">
          Comprometidos con ofrecerte una atención integral y de calidad en diversas áreas de la salud para ti y tu familia.
        </p>
      </div>

      <div className="row g-4">

        {/* CARD PRINCIPAL - PEDIATRÍA */}
        <div className="col-lg-12">
          <div className="d-flex flex-column flex-md-row align-items-center gap-4 especial-card-main pediatria-card p-4 p-md-5">
            
            {/* Ícono */}
            <div className="icon-wrapper-main pediatria-icon-wrapper">
              <FaChild className="main-icon pediatria-main-icon" />
              <div className="badge-star pediatria-star-border">
                <span className="star-icon">★</span>
              </div>
            </div>

            {/* Texto */}
            <div className="flex-grow-1 text-center text-md-start">
              <h2 className="fw-bold mb-2 text-white">Pediatría</h2>

              <p className="text-white mb-3">
                Brindamos una atención dedicada y completa para el cuidado de los niños, 
                acompañando su crecimiento desde los primeros meses de vida hasta la adolescencia. 
                Evaluamos su desarrollo, prevenimos enfermedades, realizamos controles periódicos 
                y ofrecemos un enfoque cálido y especializado para asegurar su bienestar en cada etapa.
              </p>
            </div>

          </div>
        </div>

        {/* GRID IZQUIERDO */}
        <div className="col-lg-8">
          <div className="row g-4">

            {[
              { icon: <FaHeartbeat />, title: "Cardiología", desc: "Cuidado integral del corazón y sistema circulatorio." },
              { icon: <FaUserMd />, title: "Dermatología", desc: "Diagnóstico y tratamiento de enfermedades de la piel." },
              { icon: <FaFemale />, title: "Ginecología", desc: "Salud integral de la mujer en todas las etapas de la vida." },
              { icon: <FaBone />, title: "Traumatología", desc: "Tratamiento de lesiones del aparato locomotor." }
            ].map((item, i) => (
              <div className="col-12 col-sm-6" key={i}>
                <div className="especial-card shadow-sm p-4 h-100">
                  <div className="icon-wrapper">{item.icon}</div>
                  <h5 className="fw-bold">{item.title}</h5>
                  <p className="text-muted small">{item.desc}</p>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* GRID DERECHO */}
        <div className="col-lg-4">
          <div className="row g-4">

            {[
              { icon: <FaBrain />, title: "Neurología", desc: "Estudio y tratamiento del sistema nervioso." },
              { icon: <FaEye />, title: "Oftalmología", desc: "Cuidado de la salud visual y ocular." },
              { icon: <FaTint />, title: "Urología", desc: "Diagnóstico y tratamiento del sistema urinario." }
            ].map((item, i) => (
              <div className="col-12" key={i}>
                <div className="especial-card shadow-sm p-4 h-100">
                  <div className="icon-wrapper">{item.icon}</div>
                  <h5 className="fw-bold">{item.title}</h5>
                  <p className="text-muted small">{item.desc}</p>
                </div>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
}


