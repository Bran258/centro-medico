import React from "react";
import { Link } from "react-router-dom";
import "@/styles/error/404Page.css";

const PaginaNoEncontrada = () => {
  return (
    <div className="p404-root">
      <div className="p404-main">
        <section className="p404-card" aria-labelledby="p404-title">

          <div className="p404-iconWrap" aria-hidden="true">
            <span className="p404-icon">!</span>
          </div>

          <div className="p404-text">
            <p id="p404-title" className="p404-title">
              Página No Encontrada
            </p>

            <p className="p404-desc">
              Lo sentimos, no pudimos encontrar la página que está buscando.
              Es posible que el enlace sea incorrecto o que la página haya sido eliminada.
            </p>

            <p className="p404-code">Código de error: 404</p>
          </div>

          <div className="p404-actions">
            <Link to="/" className="p404-btn">
              Ir al Inicio
            </Link>
          </div>

        </section>
      </div>
    </div>
  );
};

export default PaginaNoEncontrada;
