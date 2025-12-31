import { useEffect, useState } from "react";
import { getEspecialidades } from "@/service/especialidades.service";

export const useEspecialidadesPublic = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEspecialidades = async () => {
    const res = await getEspecialidades();
    setEspecialidades(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchEspecialidades();
  }, []);

  return { especialidades, loading };
};
