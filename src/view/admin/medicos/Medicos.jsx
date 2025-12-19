import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { FaPlus } from "react-icons/fa";
import MedicosTable from "@/components/admin/medicos/MedicosTable";
import MedicoModal from "@/components/admin/medicos/MedicoModal";
import "./Medicos.css";

export default function Medicos() {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [reload, setReload] = useState(false);

  return (
    <div className="medicos-page">
      <div className="medicos-header">
        <PageHeader
          title="Médicos"
          subtitle="Gestión del personal médico"
        />

        <button
          className="medicos-createBtn"
          onClick={() => {
            setEdit(null);
            setOpen(true);
          }}
        >
          <FaPlus /> Crear Médico
        </button>
      </div>

      <MedicosTable
        onEdit={(m) => {
          setEdit(m);
          setOpen(true);
        }}
        reload={reload}
      />

      <MedicoModal
        open={open}
        medico={edit}
        onClose={() => setOpen(false)}
        onSaved={() => setReload((p) => !p)}
      />
    </div>
  );
}

