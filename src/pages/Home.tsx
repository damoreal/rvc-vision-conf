import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EventPhotos from "@/components/EventPhotos";
import About from "@/components/About";
import Schedule from "@/components/Schedule";
import Speakers from "@/components/Speakers";
import FAQs from "@/components/FAQs";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Home = () => {
  useScrollAnimation();

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <div className="scroll-fade-in">
        <EventPhotos />
      </div>
      <div className="scroll-fade-in">
        <About />
      </div>
      <div className="scroll-fade-in">
        <Schedule />
      </div>
      <div className="scroll-fade-in">
        <Speakers />
      </div>
      <div className="scroll-fade-in">
        <FAQs />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
