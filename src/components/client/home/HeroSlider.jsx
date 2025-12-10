// src/components/HeroSlider.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/home/HeroSlider.css";
import SeasonalPromo from "../../SeasonalPromo";

export default function HeroSlider() {
  return (
    <section className="hero-slider-wrapper">

      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="6000"
      >

        {/* INDICADORES Bootstrap 5 */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
        </div>

        {/* SLIDES */}
        <div className="carousel-inner">

          {/* SLIDE 1 */}
          <div className="carousel-item active hero-slide hero-slide-1">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBTo1A78xmYMvsrfO06nvnlh_5F9YJFCLhddzTC4-O1941j_ZwQnhGdYAVhk5I3SKDLFj7L9vM6zD_Z54yXE5oCk0c7M6eIDCtAjjWEGsAmXH2UsCCEH8MbeXdgXDnHs_teQ0zFIzLonTdVe24vxFZWQwQT7GcF8nMXYcP5eC8IWYKU2vv39BTxWK7SaeMcWfy52AFR5R7rNN0FKHJKtP740L_tgDV0lSaEjIJ08WqOiSywsE32O9ggtG9aNFClZ36B-yQu0ymcg"
              className="d-block w-100 hero-img"
              alt="Slide 1"
            />

            <div className="carousel-caption d-none d-md-block hero-content">
              <h1>Tu salud, nuestra prioridad.</h1>
              <p>Ofrecemos atención médica integral con profesionales comprometidos con tu bienestar.</p>

              <div className="d-flex gap-3 justify-content-center flex-wrap mt-3">
                <Link to="/reservar_cita" className="btn btn-reservar px-4 py-2 fw-bold">
                  Reservar Cita
                </Link>
                <Link to="/especialidades" className="btn btn-light px-4 py-2 fw-bold">
                  Ver Especialidades
                </Link>
              </div>
            </div>
          </div>

          {/* SLIDE 2 */}
          <div className="carousel-item hero-slide hero-slide-2">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBTo1A78xmYMvsrfO06nvnlh_5F9YJFCLhddzTC4-O1941j_ZwQnhGdYAVhk5I3SKDLFj7L9vM6zD_Z54yXE5oCk0c7M6eIDCtAjjWEGsAmXH2UsCCEH8MbeXdgXDnHs_teQ0zFIzLonTdVe24vxFZWQwQT7GcF8nMXYcP5eC8IWYKU2vv39BTxWK7SaeMcWfy52AFR5R7rNN0FKHJKtP740L_tgDV0lSaEjIJ08WqOiSywsE32O9ggtG9aNFClZ36B-yQu0ymcg"
              className="d-block w-100 hero-img"
              alt="Slide 2"
            />

            <div className="carousel-caption d-none d-md-block hero-content">
              <h1>Atención Pediátrica Especializada</h1>
              <p>Cuidamos la salud de los más pequeños con dedicación y especialistas certificados.</p>

              <Link className="btn btn-primary px-4 py-2 fw-bold mt-3">
                Más Información
              </Link>
            </div>
          </div>

          {/* SLIDE 3 */}
          <div className="carousel-item hero-slide hero-slide-3">
            <SeasonalPromo/>
          </div>

        </div>

        {/* CONTROLES */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
          <span className="visually-hidden">Anterior</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>

      </div>
    </section>
  );
}

