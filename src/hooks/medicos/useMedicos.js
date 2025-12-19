import { useCallback, useEffect, useMemo, useState } from "react";
import { listarMedicos, eliminarMedico } from "@/service/medicos.service";

export const useMedicos = (reload = false) => {
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMedicos = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await listarMedicos(); // SOLO activos
      setMedicos(data);
    } catch (e) {
      setError(e?.response?.data?.message || "Error al cargar médicos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedicos();
  }, [fetchMedicos, reload]);

  const especialidades = useMemo(() => {
    const set = new Set(
      medicos.map((m) => m.especialidad?.nombre).filter(Boolean)
    );
    return ["Todas", ...Array.from(set)];
  }, [medicos]);

  const desactivar = async (id) => {
    // SOLO backend
    await eliminarMedico(id);

    // VUELVE A CARGAR desde backend
    await fetchMedicos();
  };

  return {
    medicos,
    especialidades,
    loading,
    error,
    desactivar,
  };
};
