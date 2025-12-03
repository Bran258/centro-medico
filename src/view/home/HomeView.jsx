// src/view/home/HomeView2.jsx
import React from "react";
import HeroSlider from "../../components/home/HeroSlider";
import WelcomeSection from "../../components/home/WelcomeSection";
import SpecialtiesSection from "../../components/home/SpecialtiesSection";


export default function HomeView() {
  return (
    <main className="flex-grow">
      <HeroSlider />
      <WelcomeSection />
      <SpecialtiesSection />
    </main>
  );
}
