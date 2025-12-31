import { useEffect, useState } from "react";
import { getHistorial } from "@/service/historial.service";

export const useHistorial = () => {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHistorial = async () => {
    try {
      setLoading(true);
      const data = await getHistorial();
      setHistorial(data);
      setError(null);
    } catch {
      setError("No se pudo cargar el historial clínico");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistorial();
  }, []);

  return {
    historial,
    loading,
    error,
    refresh: loadHistorial,
  };
};

