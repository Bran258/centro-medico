import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../service/api';
import Swal from 'sweetalert2';
import ModalDisponibilidad from '../../components/medico/ModalDisponibilidad';

export default function DashboardMedicoView() {
    const { user, logout } = useAuth();
    const [medico, setMedico] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // 1. Cargar Perfil al inicio
    useEffect(() => {
        const cargarPerfil = async () => {
            if (!user?.id) return;
            try {
                // Backend debe devolver el objeto médico + especialidad + disponibilidades
                const res = await api.get(`/medicos/perfil/${user.id}`);
                setMedico(res.data);
            } catch (error) {
                console.error("Error cargando perfil:", error);
                Swal.fire("Error", "No se pudo cargar tu perfil médico", "error");
            }
        };
        cargarPerfil();
    }, [user]);

    // 2. Pantalla de Carga
    if (!medico) return <div className="p-5 text-center"><h3>Cargando perfil... ⏳</h3></div>;

    // 3. Función para cambiar estado (Activo/Inactivo)
    const toggleEstado = async () => {
        try {
            const nuevoEstado = !medico.esActivo; // Invertir valor

            await api.put(`/medicos/${medico.id}/estado`, {
                esActivo: nuevoEstado
            });

            // Actualizar vista inmediatamente
            setMedico({ ...medico, esActivo: nuevoEstado });

            Swal.fire({
                icon: 'success',
                title: `Ahora estás ${nuevoEstado ? 'ACTIVO 🟢' : 'INACTIVO 🔴'}`,
                toast: true,
                position: 'top-end',
                timer: 2000,
                showConfirmButton: false
            });

        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'No se pudo cambiar el estado', 'error');
        }
    };

    return (
        <div className="container mt-4">
            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4 p-4 shadow-sm rounded bg-white">
                <div>
                    <h2 className="mb-0 text-primary">Dr. {medico.nombreCompleto}</h2>
                    <span className="badge bg-info text-dark mt-2 fs-6">{medico.especialidad?.nombre}</span>
                </div>
                <button className="btn btn-outline-danger" onClick={logout}>
                    Cerrar Sesión
                </button>
            </div>

            <div className="row">
                {/* COLUMNA IZQUIERDA: DATOS Y ACCIONES */}
                <div className="col-md-4">
                    <div className="card shadow-sm mb-3">
                        <div className="card-header bg-dark text-white">
                            <h5 className="mb-0">Mi Consultorio</h5>
                        </div>
                        <div className="card-body">

                            {/* ESTADO INTERACTIVO */}
                            <div className="d-flex justify-content-between align-items-center mb-3 p-2 border rounded bg-light">
                                <div>
                                    <small className="text-muted d-block">Estado Actual:</small>
                                    <span className={`badge ${medico.esActivo ? 'bg-success' : 'bg-danger'}`}>
                                        {medico.esActivo ? "🟢 Disponible" : "🔴 No Disponible"}
                                    </span>
                                </div>
                                <button
                                    className={`btn btn-sm ${medico.esActivo ? 'btn-outline-danger' : 'btn-outline-success'}`}
                                    onClick={toggleEstado}
                                >
                                    {medico.esActivo ? "Desactivar" : "Activar"}
                                </button>
                            </div>

                            <p className="mb-1"><strong>CMP:</strong> {medico.cmpCodigo || "Sin registrar"}</p>
                            <p className="mb-1"><strong>Teléfono:</strong> {medico.telefono || "Sin registrar"}</p>
                            <hr />

                            <button
                                className="btn btn-primary w-100 py-2"
                                onClick={() => setShowModal(true)}
                            >
                                📅 Configurar Disponibilidad
                            </button>
                        </div>
                    </div>
                </div>

                {/* COLUMNA DERECHA: PRÓXIMAS DISPONIBILIDADES */}
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-header bg-white">
                            <h5 className="mb-0">Mis Horarios Programados</h5>
                        </div>
                        <div className="card-body">
                            {medico.disponibilidades && medico.disponibilidades.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Fecha</th>
                                                <th>Inicio</th>
                                                <th>Fin</th>
                                                <th>Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {medico.disponibilidades.map(disp => (
                                                <tr key={disp.id}>
                                                    <td>{new Date(disp.fecha).toLocaleDateString()}</td>
                                                    <td>{new Date(disp.horaInicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                                    <td>{new Date(disp.horaFin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                                    <td><span className="badge bg-success rounded-pill">Habilitado</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="alert alert-warning text-center">
                                    No has programado horarios futuros.
                                    <br />
                                    <strong>¡Configura tu disponibilidad para recibir citas!</strong>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL PARA AGREGAR HORARIO */}
            {showModal && (
                <ModalDisponibilidad
                    medicoId={medico.id}
                    onClose={() => setShowModal(false)}
                    onSuccess={() => {
                        window.location.reload();
                    }}
                />
            )}
        </div>
    );
}