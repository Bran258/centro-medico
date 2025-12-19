import PageHeader from "../../ui/PageHeader";
import "./perfil.css";
import {
    FaUserMd,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaCamera,
    FaLock,
    FaSave,
} from "react-icons/fa";
import { usePerfil } from "@/hooks/perfil/usePerfil";
import { useAuth } from "@/hooks/auth/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";

const Perfil = () => {
    const {
        perfil,
        setPerfil,
        loading,
        saving,
        savePerfil,
        changeFotoPerfil,
        changePassword,
        changeEmail,
    } = usePerfil();

    const { user } = useAuth();
    const [email, setEmail] = useState(user?.email || "");
    const [newPassword, setNewPassword] = useState("");

    // UTIL: SOLO NÚMEROS + LONGITUD
    const onlyNumbers = (value, maxLength) => {
        return value.replace(/\D/g, "").slice(0, maxLength);
    };

    if (loading) return <p>Cargando perfil...</p>;
    if (!perfil) return <p>No se pudo cargar el perfil</p>;

    const persona = perfil.persona;

    // GUARDAR PERFIL

    const handleSavePerfil = async () => {
        try {
            await savePerfil();

            // Cambio de correo
            if (email !== user.email) {
                const { value: password } = await Swal.fire({
                    title: "Confirmar identidad",
                    input: "password",
                    inputLabel: "Ingrese su contraseña actual",
                    inputPlaceholder: "Contraseña",
                    showCancelButton: true,
                    confirmButtonText: "Confirmar",
                    cancelButtonText: "Cancelar",
                });

                if (!password) return;

                await changeEmail(email);

                Swal.fire({
                    icon: "info",
                    title: "Confirmación enviada",
                    text: "Revisa tu correo para confirmar el nuevo email.",
                });

                return;
            }

            Swal.fire({
                icon: "success",
                title: "Perfil actualizado",
                timer: 2000,
                showConfirmButton: false,
            });

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message,
            });
        }
    };

    return (
        <div className="perfil-main">
            <div className="perfil-container">

                <PageHeader
                    title="Perfil de Usuario"
                    subtitle="Administra tu información personal y seguridad."
                />

                <section className="perfil-grid">

                    {/* ================= IZQUIERDA ================= */}
                    <aside className="perfil-left">

                        <div className="perfil-card perfil-card-user">
                            <div className="perfil-cover" />

                            <div className="perfil-avatar-wrapper">
                                <img
                                    className="perfil-avatar"
                                    src={persona.foto_url || "/avatar.png"}
                                    alt="Perfil"
                                />

                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    id="upload-avatar"
                                    onChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;

                                        try {
                                            await changeFotoPerfil(file);
                                            Swal.fire("Foto actualizada", "", "success");
                                        } catch (err) {
                                            Swal.fire("Error", err.message, "error");
                                        }
                                    }}
                                />

                                <button
                                    className="perfil-avatar-btn"
                                    onClick={() =>
                                        document.getElementById("upload-avatar").click()
                                    }
                                >
                                    <FaCamera size={16} />
                                </button>
                            </div>

                            <h2 className="perfil-name">
                                <FaUserMd /> {persona.nombres} {persona.apellidos}
                            </h2>

                            <p className="perfil-role">{perfil.role}</p>

                            <div className="perfil-badges">
                                <span className="perfil-badge success">Activo</span>
                                <span className="perfil-badge gray">
                                    DNI: {persona.dni || "—"}
                                </span>
                            </div>
                        </div>

                        <div className="perfil-card">
                            <h3 className="perfil-section-title">Contacto</h3>
                            <ul className="perfil-contact">
                                <li><FaEnvelope /> {user.email}</li>
                                <li><FaPhone /> {persona.telefono || "—"}</li>
                                <li><FaMapMarkerAlt /> Consultorio asignado</li>
                            </ul>
                        </div>

                    </aside>

                    {/* ================= DERECHA ================= */}
                    <section className="perfil-right">

                        {/* DATOS PERSONALES */}
                        <div className="perfil-card">
                            <div className="perfil-card-header">
                                <h3>Datos Personales</h3>
                            </div>

                            <form className="perfil-form">

                                <div>
                                    <label>Nombre</label>
                                    <input
                                        value={persona.nombres}
                                        onChange={(e) =>
                                            setPerfil({
                                                ...perfil,
                                                persona: {
                                                    ...persona,
                                                    nombres: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <label>Apellidos</label>
                                    <input
                                        value={persona.apellidos}
                                        onChange={(e) =>
                                            setPerfil({
                                                ...perfil,
                                                persona: {
                                                    ...persona,
                                                    apellidos: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </div>

                                {/* DNI - 8 DÍGITOS */}
                                <div>
                                    <label>DNI</label>
                                    <input
                                        inputMode="numeric"
                                        maxLength={8}
                                        placeholder="8 dígitos"
                                        value={persona.dni || ""}
                                        onChange={(e) =>
                                            setPerfil({
                                                ...perfil,
                                                persona: {
                                                    ...persona,
                                                    dni: onlyNumbers(e.target.value, 8),
                                                },
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <label>Correo Electrónico</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                {/* CELULAR - 9 DÍGITOS */}
                                <div>
                                    <label>Teléfono</label>
                                    <input
                                        inputMode="numeric"
                                        maxLength={9}
                                        placeholder="9 dígitos"
                                        value={persona.telefono || ""}
                                        onChange={(e) =>
                                            setPerfil({
                                                ...perfil,
                                                persona: {
                                                    ...persona,
                                                    telefono: onlyNumbers(e.target.value, 9),
                                                },
                                            })
                                        }
                                    />
                                </div>

                                <div className="perfil-form-actions">
                                    <button
                                        type="button"
                                        className="btn-primary"
                                        onClick={handleSavePerfil}
                                        disabled={saving}
                                    >
                                        <FaSave /> {saving ? "Guardando..." : "Guardar Cambios"}
                                    </button>
                                </div>

                            </form>
                        </div>

                        {/* SEGURIDAD */}
                        <div className="perfil-card">
                            <div className="perfil-card-header">
                                <h3><FaLock /> Seguridad</h3>
                            </div>

                            <form
                                className="perfil-form"
                                onSubmit={async (e) => {
                                    e.preventDefault();
                                    try {
                                        await changePassword(newPassword);
                                        setNewPassword("");

                                        Swal.fire({
                                            icon: "success",
                                            title: "Contraseña actualizada",
                                            timer: 2000,
                                            showConfirmButton: false,
                                        });
                                    } catch (err) {
                                        Swal.fire({
                                            icon: "error",
                                            title: "Error",
                                            text: err.message,
                                        });
                                    }
                                }}
                            >
                                <div>
                                    <label>Nueva Contraseña</label>
                                    <input
                                        type="password"
                                        minLength={8}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="perfil-security">
                                    <span>Mínimo 8 caracteres</span>
                                    <button type="submit">Actualizar</button>
                                </div>
                            </form>
                        </div>

                    </section>
                </section>
            </div>
        </div>
    );
};

export default Perfil;
