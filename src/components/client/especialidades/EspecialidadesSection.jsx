import "@/styles/client/especialidades/EspecialidadesSection.css";
import { useEspecialidadesPublic } from "@/hooks/especialidades/useEspecialidadesPublic";

export default function EspecialidadesSection() {
  const { especialidades, loading } = useEspecialidadesPublic();

  if (loading) return null;

  const pediatria = especialidades.find(
    (e) => e.nombre.toLowerCase().trim() === "pediatría"
  );

  const otras = especialidades.filter(
    (e) => e.nombre.toLowerCase().trim() !== "pediatría"
  );

  return (
    <section className="esp-especialidades-seccion esp-container-seccion">

      {/* HEADER */}
      <div className="esp-header">
        <h2 className="esp-title">Especialidades médicas</h2>
        <p className="esp-subtitle">
          Atención médica especializada con un enfoque profesional y humano.
        </p>
      </div>

      {/* PEDIATRÍA */}
      {pediatria && (
        <div className="esp-featured">
          <h3 className="esp-featured-title">{pediatria.nombre}</h3>
          <p className="esp-featured-desc">
            {pediatria.descripcion ||
              "Cuidado integral de la salud infantil, enfocado en la prevención, el desarrollo y el bienestar del niño."}
          </p>
        </div>
      )}

      {/* RESTO */}
      <div className="esp-grid">
        {otras.map((esp) => (
          <div className="esp-card" key={esp.id}>
            <h4 className="esp-card-title">{esp.nombre}</h4>
            <p className="esp-card-desc">
              {esp.descripcion ||
                "Atención médica especializada y personalizada."}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
}