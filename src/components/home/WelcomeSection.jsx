// src/components/WelcomeSection.jsx
import React from "react";
import "../../styles/home/WelcomeSection.css";
import { Link } from "react-router-dom";

export default function WelcomeSection() {
  return (
    <section className="py-5 welcome-text-white">
      <div className="container">

        <div className="row align-items-center g-5">

          {/* Texto */}
          <div className="col-lg-6">
            <h2 className="fw-bold display-6">Bienvenido a Centro Médico Santa Rosa</h2>

            <p className="mt-3">
              Nuestra misión es proporcionar atención médica de alta calidad en un ambiente cálido.
              Nos dedicamos a la prevención, diagnóstico y tratamiento con tecnología moderna.
            </p>

            < Link className="btn btn-primary px-4 py-2 fw-bold mt-3" to="/sobre_nosotros">
              Conoce más de nosotros
            </Link>
          </div>

          {/* Imagen */}
          <div className="col-lg-6">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0RT-dj8qcQyWzGeDLrIZyAFI3P11g5WMTXbPnde7Q2jo4M5PBPZeTNFaRfErrxwKWYhfzA06Sz39BWdqafO7-mk8n7HrPogbk2Nj-RjRaPRXyR91zIvba7HqhSNikMWCvSK0SzqD6L7Ryyejpnw0jyU6E_NgTY1B0Y6ncWJPrZCZ465voHM_N6hvkoXbDjfaGBiLJRdAmXi7wPzE6zoj5dl35Q8W9TJCUefDfv8B57hn0goIHDYBdGr1jQcdOZMW_K6YAriv9fg"
              className="img-fluid rounded-3 shadow"
              alt="Doctora sonriendo"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
