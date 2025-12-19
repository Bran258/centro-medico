import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { useAuth } from "../../hooks/auth/useAuth.js";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/auth/Login.css";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loadingLogin, setLoadingLogin] = useState(false);

  const { login, getUserRole } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (loadingLogin) return;

    if (!user || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Ingrese su correo y contraseña.",
      });
      return;
    }

    setLoadingLogin(true);

    //Login con Supabase
    const authResponse = await login({
      email: user,
      password,
    });

    if (authResponse.error) {
      setLoadingLogin(false);
      Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: "Credenciales inválidas.",
      });
      return;
    }

    const supabaseUserId = authResponse.user.id;

    //Obtener rol desde backend
    const roleResponse = await getUserRole(supabaseUserId);

    setLoadingLogin(false);

    if (roleResponse.error || !roleResponse.role) {
      Swal.fire({
        icon: "error",
        title: "Sin rol asignado",
        text: "Su cuenta no tiene permisos para ingresar.",
      });
      return;
    }

    const role = roleResponse.role;

    Swal.fire({
      icon: "success",
      title: "Bienvenido",
      text: `Acceso como ${role}`,
      timer: 1500,
      showConfirmButton: false,
    });

    if (role === "admin") {
      navigate("/panel/admin");
      return;
    }

    if (role === "asistente") {
      navigate("/panel/asistente");
      return;
    }

    Swal.fire({
      icon: "error",
      title: "Rol desconocido",
      text: "Consulte al administrador del sistema.",
    });
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <MdHealthAndSafety className="login-icon" />
        <h1 className="login-title">Panel de Administración</h1>
        <p className="login-subtitle">Inicie sesión para continuar</p>
      </div>

      <div className="login-input-group">
        <label className="login-label">
          <p className="login-label-text">Correo</p>
          <div className="login-input-wrapper">
            <input
              type="email"
              className="login-input"
              placeholder="Correo del administrador"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <div className="login-input-icon">
              <FaUser />
            </div>
          </div>
        </label>

        <label className="login-label">
          <p className="login-label-text">Contraseña</p>
          <div className="login-input-wrapper">
            <input
              type="password"
              className="login-input"
              placeholder="Ingrese su contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="login-input-icon">
              <FaLock />
            </div>
          </div>
        </label>
      </div>

      <button
        className="login-button"
        onClick={handleLogin}
        disabled={loadingLogin}
      >
        {loadingLogin ? "Ingresando..." : "Ingresar"}
      </button>
    </div>
  );
}
