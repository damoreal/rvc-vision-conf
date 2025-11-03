import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EventPhotos from "@/components/EventPhotos";
import About from "@/components/About";
import Schedule from "@/components/Schedule";
import Speakers from "@/components/Speakers";
import FAQs from "@/components/FAQs";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <div className="animate-fade-in">
        <EventPhotos />
      </div>
      <div className="animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
        <About />
      </div>
      <div className="animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
        <Schedule />
      </div>
      <div className="animate-fade-in" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
        <Speakers />
      </div>
      <div className="animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}>
        <FAQs />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
