import { useState } from 'react';
import api from '../../service/api';
import Swal from 'sweetalert2';

export default function ModalDisponibilidad({ medicoId, onClose, onSuccess }) {
    const [fecha, setFecha] = useState('');
    const [horaInicio, setHoraInicio] = useState('08:00');
    const [horaFin, setHoraFin] = useState('13:00');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post('/disponibilidad', {
                medicoId,
                fecha,
                horaInicio,
                horaFin
            });

            Swal.fire({
                icon: 'success',
                title: 'Horario Guardado',
                text: 'Los pacientes ya pueden ver este horario.',
                timer: 1500
            });
            onSuccess(); // Avisar al padre que recargue
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'No se pudo guardar. Verifica que no se cruce con otro horario.', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">Nueva Disponibilidad</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Fecha de Atención</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    required
                                    min={new Date().toISOString().split('T')[0]} // No permitir fechas pasadas
                                    value={fecha}
                                    onChange={(e) => setFecha(e.target.value)}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <label className="form-label">Hora Inicio</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        required
                                        value={horaInicio}
                                        onChange={(e) => setHoraInicio(e.target.value)}
                                    />
                                </div>
                                <div className="col-6 mb-3">
                                    <label className="form-label">Hora Fin</label>
                                    <input
                                        type="time"
                                        className="form-control"
                                        required
                                        value={horaFin}
                                        onChange={(e) => setHoraFin(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Guardando...' : 'Habilitar Horario'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}