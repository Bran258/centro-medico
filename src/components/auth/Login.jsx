import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// 1. CAMBIO IMPORTANTE: Usamos el nuevo Contexto que creamos
import { useAuth } from "../../context/AuthContext";
import "../../styles/auth/Login.css";

export default function Login() {
    const [user, setUser] = useState(""); // Este es el email
    const [password, setPassword] = useState("");
    const [loadingLogin, setLoadingLogin] = useState(false);

    // 2. Extraemos la función login del contexto
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (loadingLogin) return;

        // Validación básica
        if (!user || !password) {
            Swal.fire({
                icon: "warning",
                title: "Campos incompletos",
                text: "Ingrese su usuario y contraseña.",
            });
            return;
        }

        setLoadingLogin(true);

        // 3. CAMBIO: Llamamos al login pasando (email, password)
        const result = await login(user, password);

        setLoadingLogin(false);

        // 4. CAMBIO: Verificamos si hubo éxito
        if (result.success) {
            // Recuperamos el usuario guardado para saber su rol
            const savedUser = JSON.parse(localStorage.getItem('user'));
            const role = savedUser?.rol; // "ADMIN" o "MEDICO"

            Swal.fire({
                icon: "success",
                title: "Bienvenido",
                text: `Acceso autorizado`,
                timer: 1500,
                showConfirmButton: false,
            });

            // 5. Redirección INTELIGENTE (Aquí estaba el problema)
            if (role === "ADMIN") {
                navigate("/panel/admin"); // Admin -> Su panel
            } else if (role === "MEDICO") {
                navigate("/panel/medico"); // Médico -> ¡A SU NUEVO PANEL!
            } else {
                // Si es otro rol (ej. Recepción), lo mandamos al inicio o a su panel correspondiente
                navigate("/");
            }

        } else {
            // Manejo de Errores (Vienen del backend)
            Swal.fire({
                icon: "error",
                title: "Acceso denegado",
                text: result.message || "Credenciales inválidas.",
            });
        }
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
                    <p className="login-label-text">Usuario</p>
                    <div className="login-input-wrapper">
                        <input
                            type="email"
                            className="login-input"
                            placeholder="admin@santarosa.com"
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

            <button className="login-button" onClick={handleLogin} disabled={loadingLogin}>
                {loadingLogin ? "Ingresando..." : "Ingresar"}
            </button>
        </div>
    );
}