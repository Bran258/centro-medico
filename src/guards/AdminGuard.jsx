import { useEffect, useState, useRef } from "react";

const AdminGuard = ({ children }) => {
    const [authorized, setAuthorized] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState(false);

    // Usamos useRef para evitar que el código se re-envíe en cada render
    const hasLogged = useRef(false);

    useEffect(() => {
        // 1. Verificar si ya tiene permiso de antes
        const isAuth = sessionStorage.getItem("admin_access");
        if (isAuth === "true") {
            setAuthorized(true);
            return;
        }

        // 2. Generar código si no está autorizado
        if (!hasLogged.current) {
            const secretCode = Math.floor(1000 + Math.random() * 9000).toString();
            sessionStorage.setItem("temp_code", secretCode);

            // 3. ENVIAR EL CÓDIGO A LA TERMINAL DE VISUAL STUDIO
            // Hacemos una petición silenciosa a nuestro plugin de Vite
            fetch(`/__log_secret?code=${secretCode}`);

            hasLogged.current = true;
        }
    }, []);

    const handleUnlock = () => {
        const secretCode = sessionStorage.getItem("temp_code");
        if (inputValue === secretCode) {
            sessionStorage.setItem("admin_access", "true");
            setAuthorized(true);
        } else {
            setError(true);
            setInputValue("");
        }
    };

    if (!authorized) {
        return (
            // FONDO SEMI-TRANSPARENTE (Overlay)
            <div style={{
                position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.8)", // Oscurece el fondo
                zIndex: 9999,
                display: "flex", justifyContent: "center", alignItems: "center"
            }}>

                {/* PEQUEÑO RECUADRO (Modal) */}
                <div style={{
                    backgroundColor: "white",
                    padding: "30px",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                    textAlign: "center",
                    width: "350px",
                    maxWidth: "90%"
                }}>
                    <h2 style={{ color: "#d32f2f", margin: "0 0 10px 0" }}>🔒 Admin Protegido</h2>
                    <p style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}>
                        Se requiere autorización. Revisa la <b>Terminal de VS Studio</b> para ver el código.
                    </p>

                    <input
                        type="text"
                        placeholder="Ingresa el código"
                        value={inputValue}
                        onChange={(e) => { setError(false); setInputValue(e.target.value); }}
                        style={{
                            width: "100%", padding: "10px", fontSize: "16px",
                            border: error ? "2px solid red" : "1px solid #ccc",
                            borderRadius: "6px", marginBottom: "15px", outline: "none"
                        }}
                    />

                    <button
                        onClick={handleUnlock}
                        style={{
                            width: "100%", padding: "10px", backgroundColor: "#007bff",
                            color: "white", border: "none", borderRadius: "6px",
                            cursor: "pointer", fontSize: "16px", fontWeight: "bold"
                        }}
                    >
                        Desbloquear
                    </button>

                    {error && <p style={{ color: "red", marginTop: "10px", fontSize: "12px" }}>Código incorrecto</p>}
                </div>
            </div>
        );
    }

    return children;
};

export default AdminGuard;