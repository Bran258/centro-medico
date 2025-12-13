import HeroSlider from "../../../components/client/home/HeroSlider";
import WelcomeSection from "../../../components/client/home/WelcomeSection";
import SpecialtiesSection from "../../../components/client/home/SpecialtiesSection";


export default function HomeView() {
  return (
    <main className="flex-grow">
      <HeroSlider />
      <WelcomeSection />
      <SpecialtiesSection />
    </main>
  );
}
