import { useEffect, useState } from "react";
import {
  getDashboardStats,
  getCitasPorEstado,
  getCitasUltimos7Dias,
  getProximasCitas,
} from "@/service/dashboard.service";

export const useDashboard = () => {
  const [stats, setStats] = useState(null);
  const [porEstado, setPorEstado] = useState([]);
  const [ultimos7, setUltimos7] = useState([]);
  const [proximas, setProximas] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = async () => {
    setLoading(true);
    setError("");

    try {
      const [s, e, u7, p] = await Promise.all([
        getDashboardStats(),
        getCitasPorEstado(),
        getCitasUltimos7Dias(),
        getProximasCitas(),
      ]);

      setStats(s);
      setPorEstado(e || []);
      setUltimos7(u7 || []);
      setProximas(p || []);
    } catch (err) {
      setError(err?.response?.data?.message || "Error cargando dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { stats, porEstado, ultimos7, proximas, loading, error, refresh };
};
