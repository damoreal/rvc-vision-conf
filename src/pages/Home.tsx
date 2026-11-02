import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import EventPhotos from "@/components/EventPhotos";
import About from "@/components/About";
import Countdown from "@/components/Countdown";
import Schedule from "@/components/Schedule";
import Speakers from "@/components/Speakers";
import Streaming from "@/components/Streaming";
import Venue from "@/components/Venue";
import FAQs from "@/components/FAQs";
import Footer from "@/components/Footer";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Home = () => {
  useScrollAnimation();

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Marquee />
      <div className="scroll-fade-in">
        <About />
      </div>
      <div className="scroll-fade-in">
        <Countdown />
      </div>
      <div className="scroll-fade-in">
        <Schedule />
      </div>
      <div className="scroll-fade-in">
        <Speakers />
      </div>
      <div className="scroll-fade-in">
        <EventPhotos />
      </div>
      <div className="scroll-fade-in">
        <Streaming />
      </div>
      <div className="scroll-fade-in">
        <Venue />
      </div>
      <div className="scroll-fade-in">
        <FAQs />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
