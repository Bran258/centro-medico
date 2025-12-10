import "@/styles/error/Loading.css";

export default function Loading() {
  return (
    <div className="loading-root">
      <div className="loading-container">

        {/* Spinner */}
        <div className="loading-spinner-wrapper">
          <div className="loading-spinner"></div>
        </div>

        {/* Título */}
        <h1 className="loading-title">Centro Médico Santa Rosa</h1>

        {/* Texto + Barra de progreso */}
        <div className="loading-progress-box">
          <p className="loading-text">Cargando, por favor espere...</p>

          <div className="loading-progress-bg">
            <div className="loading-progress-fill"></div>
          </div>
        </div>

      </div>
    </div>
  );
}

