import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const FALLBACK = [-12.0464, -77.0428]; // Lima

export default function ContactoMapaUsuario() {
  const [position, setPosition] = useState(FALLBACK);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([
          pos.coords.latitude,
          pos.coords.longitude,
        ]);
      },
      () => {
        // si no da permiso, se queda en fallback
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
      }
    );
  }, []);

  return (
    <div className="contacto-mapa-card">
      <div className="contacto-mapa-head">
        <p className="contacto-mapa-title">Tu ubicación</p>
        <p className="contacto-mapa-subtitle">
          Ubicación aproximada detectada automáticamente
        </p>
      </div>

      <div className="contacto-mapa">
        <MapContainer
          center={position}
          zoom={15}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={position}>
            <Popup>Estás aquí</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
