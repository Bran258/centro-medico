
import PageHeader from "@/components/ui/PageHeader";
import Citas from "@/components/admin/citas/Citas";
import { useCitas } from "@/hooks/citas/useCitas";

export default function CitasView() {
  const { citas, loading, confirmar, cancelar, atender } = useCitas();

  if (loading) return <p>Cargando citas...</p>;

  return (
    <>
      <PageHeader
        title="Citas Médicas"
        subtitle="Gestión y asignación de citas"
      />

      <Citas
        citas={citas}
        confirmar={confirmar}
        cancelar={cancelar}
        atender={atender}
      />
    </>
  );
}




