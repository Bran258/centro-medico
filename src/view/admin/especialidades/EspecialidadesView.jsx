import React from "react";
import PageHeader from "../../../components/ui/PageHeader";
import Especialidades from "../../../components/admin/especialidades/Especialidades";
import "./EspecialidadesView.css";

const EspecialidadesView = () => {
  return (
    <div>
      <div className="especialidades-header">
        <PageHeader
          title="Especialidades"
          subtitle="Gestión de las especialidades médicas"
        />
      </div>

      <Especialidades />
    </div>
  );
};

export default EspecialidadesView;
