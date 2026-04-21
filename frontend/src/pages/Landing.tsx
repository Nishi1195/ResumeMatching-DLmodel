import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Problem from "../components/Problem";
import PinnedSection from "../components/PinnedSection";
import ImpactSection from "../components/ImpactSection";
import Footer from "../components/Footer";
import GlobalBreeze from "../components/GlobalBreeze";

const Landing: React.FC = () => {
  useEffect(() => {
  
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ position: "relative" }}>
        {/* Continuous Full-Page Animation Layer */}
        <GlobalBreeze />
        
        <Hero />
        <Problem />
        <PinnedSection />
        <ImpactSection />
      </main>
      <Footer />
    </>
  );
};

export default Landing;