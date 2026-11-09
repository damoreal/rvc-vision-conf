import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import heroWorship from "@/assets/hero-worship.jpg";
import stageScene from "@/assets/hero_scene_stage.jpg.asset.json";
import prayerScene from "@/assets/hero_scene_prayer.jpg.asset.json";
import prayerCrowdScene from "@/assets/hero_scene_prayer_crowd.jpg.asset.json";
import ministerScene from "@/assets/hero_scene_minister.jpeg.asset.json";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const heroSlides = [
  { src: heroWorship, alt: "A worshipper lifted in worship" },
  { src: stageScene.url, alt: "A worship gathering at the conference" },
  { src: prayerScene.url, alt: "A believer praying at the conference" },
  { src: prayerCrowdScene.url, alt: "A woman in prayer during worship" },
  { src: ministerScene.url, alt: "A minister leading a conference session" },
];

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

const slidePhrases = [0, 1, 2, 0, 1];
const phraseSlides = [0, 1, 2];

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const activePhrase = slidePhrases[activeSlide];
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

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 5000);
    return () => window.clearTimeout(timer);
  }, [activeSlide]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ink pt-24">
      {/* Cinematic background crossfades between real conference moments. */}
      <div className="absolute inset-0 bg-ink">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            aria-hidden="true"
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1400ms] ease-in-out",
              activeSlide === index ? "opacity-100 ken-burns" : "opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-ink/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/85"></div>
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto grid max-w-7xl items-center gap-4 py-8 lg:grid-cols-[minmax(230px,0.7fr)_minmax(0,1.8fr)] lg:gap-16 lg:py-16">
          <div className="order-2 space-y-1.5 lg:order-1 lg:space-y-5" aria-label="Conference highlights">
            {sidePhrases.map((phrase, index) => {
              const selected = activePhrase === index;
              return (
                <Button
                  key={phrase}
                  type="button"
                  variant="ghost"
                  aria-pressed={selected}
                  onClick={() => setActiveSlide(phraseSlides[index])}
                  className={cn(
                    "group h-auto w-full justify-start whitespace-normal rounded-none border-l-2 px-3 py-2 text-left font-heading text-sm font-semibold uppercase leading-relaxed transition-all duration-500 sm:px-4 sm:py-3 sm:text-lg",
                    selected
                      ? "border-gold bg-ink/45 text-gold text-glow-gold"
                      : "border-secondary-foreground/30 text-secondary-foreground hover:border-gold/60 hover:bg-ink/30 hover:text-secondary-foreground",
                  )}
                >
                  <span className="mr-3 text-xs text-gold/80">0{index + 1}</span>
                  <span>{phrase}</span>
                </Button>
              );
            })}
            <div className="flex gap-2 pl-4 pt-2" aria-hidden="true">
              {heroSlides.map((slide, index) => (
                <span
                  key={slide.src}
                  className={cn(
                    "h-1 rounded-full transition-all duration-500",
                    activeSlide === index ? "w-8 bg-gold" : "w-2 bg-secondary-foreground/50",
                  )}
                />
              ))}
            </div>
          </div>

          <div className="order-1 text-center lg:order-2 lg:text-left">
            <div className="intro-reveal mb-6 flex items-center justify-center gap-4 lg:justify-start" style={{ animationDelay: "0.15s" }}>
              <span className="hidden h-px w-16 bg-gradient-to-r from-transparent to-gold/70 sm:block"></span>
              <p className="text-glow-gold text-xs font-heading font-bold uppercase tracking-[0.25em] text-gold sm:text-sm">
                Running with the Vision Conference · 2026
              </p>
            </div>

            <h1 className="font-display select-none leading-[0.82] text-5xl text-secondary-foreground text-glow-soft sm:text-8xl xl:text-[10rem]">
              <span className="block intro-reveal" style={{ animationDelay: "0.35s" }}>MANIFES</span>
              <span className="block intro-reveal text-gold text-glow-gold sm:ml-[12%]" style={{ animationDelay: "0.55s" }}>TATION</span>
            </h1>

            <p className="intro-reveal mx-auto mt-4 max-w-2xl font-serif text-base italic leading-relaxed text-secondary-foreground/90 sm:mt-7 sm:text-xl lg:mx-0" style={{ animationDelay: "0.8s" }}>
              Spirit-inspired teachings and impartation — empowering believers for the work of ministry, until Heaven's reality is made visible.
            </p>

            <div className="intro-reveal mt-5 flex flex-col justify-center gap-3 sm:mt-9 sm:flex-row lg:justify-start" style={{ animationDelay: "1.05s" }}>
              <Button asChild size="lg" className="rounded-full bg-gold px-10 py-6 font-heading text-lg font-bold text-gold-foreground shadow-gold transition-all hover:scale-105 hover:bg-gold-light">
                <Link to="/registration">Register Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-secondary-foreground/30 bg-ink/25 px-10 py-6 font-heading text-lg font-semibold text-secondary-foreground transition-all hover:scale-105 hover:bg-secondary-foreground/10">
                <a href="#about">Explore the Conference</a>
              </Button>
            </div>
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
