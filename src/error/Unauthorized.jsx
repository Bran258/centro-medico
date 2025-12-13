import "@/styles/error/Unauthorized.css";
import { Link } from "react-router-dom";
import { MdLock } from "react-icons/md";

export default function Unauthorized() {
  return (
    <div className="unauth-root">

      <main className="unauth-main">
        <div className="unauth-box">
          <div className="unauth-icon-circle">
            <MdLock className="unauth-lock-icon" />
          </div>

          <div className="unauth-texts">
            <p className="unauth-heading">Acceso No Autorizado</p>
            <p className="unauth-description">
              No cuenta con los permisos necesarios para acceder a esta página.
              Si cree que esto es un error, por favor póngase en contacto con el
              administrador del sistema.
            </p>
            <p className="unauth-error">Error 403: Forbidden</p>
          </div>

          <Link to="/" className="unauth-btn">
            Volver al Inicio
          </Link>

          <p className="unauth-support">Contactar a Soporte</p>
        </div>
      </main>
    </div>
  );
}
