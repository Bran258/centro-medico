import React from "react";
import SobreNosotrosHero from "../../components/sobrenosotros/SobreNosotrosHero";
import MisionVision from "../../components/sobrenosotros/MisionVision";
import Valores from "../../components/sobrenosotros/Valores";
import useSobreNosotros from "../../hooks/useSobreNosotros.jsx";

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

