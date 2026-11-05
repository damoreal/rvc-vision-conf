import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Sparkles, ChevronDown } from "lucide-react";
import heroWorship from "@/assets/hero-worship.jpg";

interface Ember {
  left: string;
  bottom: string;
  size: number;
  duration: number;
  delay: number;
  driftX: string;
}

const sidePhrases = [
  "The gathering where promises become visible...",
  "Five days in the glory of God...",
  "The conference you have been waiting for...",
];

const Hero = () => {
  const embers = useMemo<Ember[]>(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        bottom: `${(i * 53) % 40 - 10}%`,
        size: 3 + ((i * 7) % 6),
        duration: 9 + ((i * 13) % 8),
        delay: (i * 1.3) % 9,
        driftX: `${((i * 29) % 60) - 30}px`,
      })),
    []
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink pt-24">
      {/* Cinematic landscape backdrop */}
      <div className="absolute inset-0">
        <img
          src={heroWorship}
          alt="A worshipper lifted in worship"
          className="w-full h-full object-cover object-[68%_center] ken-burns"
        />
        {/* Cinematic scrims so the wordmark and content stay legible */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(170,45%,6%,0.7)_0%,hsl(170,45%,6%,0.18)_28%,hsl(170,45%,5%,0.3)_52%,hsl(170,45%,7%,0.88)_80%,hsl(170,45%,7%,0.97)_100%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_62%_38%,transparent_0%,hsl(170,45%,5%,0.4)_100%)]"></div>
      </div>

      {/* Floating embers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {embers.map((e, i) => (
          <div
            key={i}
            className="ember"
            style={{
              left: e.left,
              bottom: e.bottom,
              width: e.size,
              height: e.size,
              animationDuration: `${e.duration}s`,
              animationDelay: `${e.delay}s`,
              ["--drift-x" as string]: e.driftX,
            }}
          ></div>
        ))}
      </div>

      {/* Ambient glow blooms */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl breathe-gold pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/5 w-80 h-80 rounded-full bg-gold/10 blur-3xl breathe-gold pointer-events-none"></div>

      {/* Whispered side phrases, like a crowd in expectation */}
      <div className="hidden xl:block absolute left-[6%] top-1/2 -translate-y-1/2 space-y-12 pointer-events-none">
        {sidePhrases.map((phrase, i) => (
          <p
            key={phrase}
            className={`intro-reveal max-w-[220px] font-heading font-semibold uppercase tracking-wide text-sm leading-relaxed ${
              i === 1 ? "text-gold" : "text-white/45"
            }`}
            style={{ animationDelay: `${1.3 + i * 0.25}s` }}
          >
            {phrase}
          </p>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          {/* Kicker */}
          <div className="intro-reveal flex items-center justify-center gap-4 mb-6" style={{ animationDelay: "0.15s" }}>
            <span className="hidden sm:block h-px w-16 bg-gradient-to-r from-transparent to-gold/70"></span>
            <p className="text-gold text-[11px] md:text-sm font-heading font-bold tracking-[0.35em] uppercase text-glow-gold">
              Running with the Vision Conference &middot; 2026
            </p>
            <span className="hidden sm:block h-px w-16 bg-gradient-to-l from-transparent to-gold/70"></span>
          </div>

          {/* The wordmark — two staggered lines like the flyer */}
          <h1 className="font-display leading-[0.82] tracking-tight text-white select-none">
            <span className="block intro-reveal text-[19vw] md:text-[13vw] lg:text-[11rem] text-glow-soft" style={{ animationDelay: "0.35s" }}>
              MANIFES
            </span>
            <span className="block intro-reveal text-[19vw] md:text-[13vw] lg:text-[11rem] md:ml-[14%] text-gold text-glow-gold" style={{ animationDelay: "0.55s" }}>
              TATION
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="intro-reveal mt-8 text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-serif italic leading-relaxed"
            style={{ animationDelay: "0.8s" }}
          >
            Spirit-inspired teachings and impartation — empowering believers for
            the work of ministry, until Heaven's reality is made visible.
          </p>

          {/* Event detail pills */}
          <div
            className="intro-reveal flex flex-wrap justify-center gap-3 md:gap-4 mt-10"
            style={{ animationDelay: "1s" }}
          >
            <div className="glass-light px-4 py-2 rounded-full flex items-center gap-2 text-white text-sm font-medium">
              <Calendar className="w-4 h-4 text-gold" />
              9th – 13th December, 2026
            </div>
            <div className="glass-light px-4 py-2 rounded-full flex items-center gap-2 text-white text-sm font-medium">
              <Clock className="w-4 h-4 text-gold" />
              9am &amp; 4pm WAT
            </div>
            <div className="glass-light px-4 py-2 rounded-full flex items-center gap-2 text-white text-sm font-medium">
              <MapPin className="w-4 h-4 text-gold" />
              The Godhouse Centre, Warri
            </div>
            <div className="glass-light px-4 py-2 rounded-full flex items-center gap-2 text-white text-sm font-medium">
              <Sparkles className="w-4 h-4 text-gold" />
              Streamed Live &middot; Wholeword TV &middot; YouTube &middot; Facebook
            </div>
          </div>

          {/* CTAs */}
          <div
            className="intro-reveal flex flex-col sm:flex-row gap-4 justify-center mt-12"
            style={{ animationDelay: "1.15s" }}
          >
            <Button
              asChild
              size="lg"
              className="rounded-full bg-gold text-gold-foreground hover:bg-gold-light font-heading font-bold text-lg px-10 py-6 shadow-gold hover:scale-105 transition-all"
            >
              <Link to="/registration">Register Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full glass-light text-white border-white/30 hover:bg-white/10 hover:scale-105 text-lg px-10 py-6 font-heading font-semibold transition-all"
            >
              <a href="#about">Explore the Conference</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to content"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 hover:text-gold transition-colors animate-float z-10"
      >
        <ChevronDown className="w-7 h-7" />
      </a>
    </section>
  );
};

export default Hero;
