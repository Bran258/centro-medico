import React from "react";
import SobreNosotrosHero from "../../../components/client/sobrenosotros/SobreNosotrosHero.jsx";
import MisionVision from "../../../components/client/sobrenosotros/MisionVision.jsx";
import Valores from "../../../components/client/sobrenosotros/Valores.jsx";
import useSobreNosotros from "../../../hooks/useSobreNosotros.jsx";

const SobreNosotrosView = () => {
  const { image, mision, vision, valores } = useSobreNosotros();

  return (
    <main>
      <SobreNosotrosHero />
      <MisionVision image={image} mision={mision} vision={vision} />
      <Valores valores={valores} />
    </main>
  );
};

export default SobreNosotrosView;

