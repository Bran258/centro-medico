import React from "react";
import ReservaCita from "../../components/ReservaCita.jsx";
import useReservaCita from "../../hooks/useReservaCita.js";

export default function ReservarCitaView() {
  const { datos, handleChange, handleConfirm } = useReservaCita();

  return (
    <ReservaCita
      datos={datos}
      onChange={handleChange}
      onConfirm={handleConfirm}
    />
  );
}

