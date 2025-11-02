import Header from "@/components/Header";
import Hero from "@/components/Hero";
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
      <About />
      <Schedule />
      <Speakers />
      <FAQs />
      <Footer />
    </div>
  );
};

export default Home;
