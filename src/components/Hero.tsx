import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock } from "lucide-react";
import Countdown from "@/components/Countdown";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20">
      {/* Enhanced Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-primary rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-accent rounded-full animate-ping opacity-40 delay-700"></div>
        <div className="absolute bottom-1/3 left-2/3 w-2 h-2 bg-primary rounded-full animate-ping opacity-30 delay-300"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Conference Title */}
          <div className="mb-6 animate-fade-in">
            <p className="text-primary-foreground/80 text-sm md:text-base font-heading font-bold mb-2 tracking-[0.2em] uppercase">
              Running with the Vision Conference
            </p>
            <p className="text-gold text-2xl md:text-3xl font-heading font-black tracking-wider">
              2025
            </p>
          </div>

          {/* Main Theme */}
          <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-display font-black text-primary-foreground mb-8 leading-[0.9] tracking-tight animate-scale-in" style={{ textShadow: '0 0 40px rgba(255, 215, 0, 0.3), 0 0 80px rgba(138, 43, 226, 0.2)' }}>
            HEAVEN
            <br />
            <span className="text-gold">ON EARTH</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto font-light animate-fade-in italic">
            Experience divine transformation as we explore bringing Heaven's reality into our everyday lives
          </p>

          {/* Countdown */}
          <Countdown />

          {/* Event Details */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-primary-foreground/90 animate-fade-in">
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-all">
              <Calendar className="w-5 h-5 text-gold" />
              <span className="font-medium">10th - 14th December, 2025</span>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-all">
              <Clock className="w-5 h-5 text-gold" />
              <span className="font-medium">9am & 4pm WAT</span>
            </div>
            <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-all">
              <MapPin className="w-5 h-5 text-gold" />
              <span className="font-medium">The Godhouse Centre, Warri</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90 hover:scale-105 text-lg px-8 py-6 font-bold transition-all shadow-lg hover:shadow-gold/50">
              <Link to="/registration">Register Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20 hover:scale-105 text-lg px-8 py-6 backdrop-blur-sm transition-all">
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full text-background fill-current">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
