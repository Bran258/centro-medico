import { useState } from "react";
import { HeartFill, CheckCircleFill, ShieldFill, PeopleFill } from "react-bootstrap-icons";

const useSobreNosotros = () => {
  const [data, setData] = useState({
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDeEm8CFtqRDEflD3x8b5bDon7IFfHFCUcXUOuI2CLtFqtO67AI1VxKwIARKx9fhpRYSpbDV1uFEq-LArnI7ewv1Bf1aGSiDGe3lxzLDh5DfXQolw9-slw5OTdc8l_BbYnYjMpotYNm90hHWW7OPCAOD2lIkSs80JUlAeg0VKQnQasLvObH9pYgaKUkm0iBpKupMSMX04P3amvZom_1gIAq9mMLjAD1MXTpFtRZcvr1unCBq1gCOUq87Q9AjX_z-7_C0zgx4TKIkmI",
    mision:
      "Ofrecer atención médica integral, accesible y de alta calidad, utilizando tecnología de vanguardia y un enfoque humano para mejorar la salud de nuestra comunidad.",
    vision:
      "Ser el centro médico líder en la región, reconocido por nuestra excelencia clínica, la calidez del personal y nuestro compromiso constante con la innovación en salud.",
    valores: [
      {
        title: "Compasión",
        description: "Tratamos a cada paciente con empatía, respeto y dignidad.",
        icon: <HeartFill />,
      },
      {
        title: "Excelencia",
        description: "Buscamos la más alta calidad en todo lo que hacemos.",
        icon: <CheckCircleFill />,
      },
      {
        title: "Integridad",
        description: "Actuamos con honestidad y transparencia en todo momento.",
        icon: <ShieldFill />,
      },
      {
        title: "Colaboración",
        description: "Fomentamos el trabajo en equipo para el beneficio del paciente.",
        icon: <PeopleFill />,
      },
    ],
  });

  return data;
};

export default useSobreNosotros;


