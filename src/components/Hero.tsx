import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import heroWorship from "@/assets/hero-worship.webp";
import stageScene from "@/assets/hero_scene_stage.webp";
import prayerScene from "@/assets/hero_scene_prayer.webp";
import prayerCrowdScene from "@/assets/hero_scene_prayer_crowd.webp";
import ministerScene from "@/assets/hero_scene_minister.webp";

const heroSlides = [
  { src: heroWorship, alt: "A worshipper lifted in worship" },
  { src: stageScene, alt: "A worship gathering at the conference" },
  { src: prayerScene, alt: "A believer praying at the conference" },
  { src: prayerCrowdScene, alt: "A woman in prayer during worship" },
  { src: ministerScene, alt: "A minister leading a conference session" },
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
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink pt-20 lg:min-h-screen lg:justify-center lg:pt-24">
      {/* Cinematic background crossfades between real conference moments. */}
      <div className="absolute inset-0 bg-ink">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            aria-hidden="true"
            decoding="async"
            fetchPriority={index === 0 ? "high" : "low"}
            loading="eager"
            className={cn(
              "absolute inset-0 h-full w-full object-cover object-center ken-burns transition-opacity duration-[2600ms] ease-[cubic-bezier(0.45,0,0.55,1)] will-change-[opacity,transform]",
              activeSlide === index ? "opacity-100 z-[1]" : "opacity-0 z-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-emerald-deep/20"></div>
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

      <div className="container relative z-10 mx-auto flex flex-1 flex-col px-5 lg:flex-none">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between gap-8 pb-10 pt-8 sm:pt-14 lg:grid lg:flex-none lg:grid-cols-[minmax(230px,0.7fr)_minmax(0,1.8fr)] lg:items-center lg:gap-16 lg:py-16">
          <div className="space-y-4 sm:space-y-6 lg:space-y-5" aria-label="Conference highlights">
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
                    "group h-auto w-full max-w-[17rem] justify-start whitespace-normal rounded-none border-l-0 px-0 py-0 text-left font-heading text-[0.95rem] font-semibold uppercase leading-snug transition-all duration-500 hover:bg-transparent sm:max-w-md sm:text-xl lg:max-w-none lg:border-l-2 lg:px-4 lg:py-3 lg:text-lg",
                    selected
                      ? "border-gold !text-gold text-glow-gold lg:bg-ink/45"
                      : "border-secondary-foreground/30 text-secondary-foreground/60 hover:border-gold/60 hover:text-secondary-foreground lg:text-secondary-foreground lg:hover:bg-ink/30",
                  )}
                >
                  <span>{phrase}</span>
                </Button>
              );
            })}
            <div className="flex gap-2 pt-1 lg:pl-4 lg:pt-2" aria-hidden="true">
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

          <div className="text-left">
            <div className="intro-reveal mb-3 flex items-center gap-4 lg:mb-6" style={{ animationDelay: "0.15s" }}>
              <span className="hidden h-px w-16 bg-gradient-to-r from-transparent to-gold/70 lg:block"></span>
              <p className="text-glow-gold text-[0.65rem] font-heading font-bold uppercase tracking-[0.2em] text-gold sm:text-sm sm:tracking-[0.25em]">
                Running with the Vision Conference · 2026
              </p>
            </div>

            <h1 className="font-display select-none leading-[0.85] text-[4.5rem] text-secondary-foreground text-glow-soft sm:text-9xl xl:text-[10rem]">
              <span className="block intro-reveal" style={{ animationDelay: "0.35s" }}>MANIFES</span>
              <span className="block intro-reveal text-gold text-glow-gold lg:ml-[12%]" style={{ animationDelay: "0.55s" }}>TATION</span>
            </h1>

            <p className="intro-reveal mt-7 hidden max-w-2xl lg:block font-serif text-base italic leading-relaxed text-secondary-foreground/90 sm:mt-7 sm:text-xl lg:mx-0" style={{ animationDelay: "0.8s" }}>
              Spirit-inspired teachings and impartation — empowering believers for the work of ministry, until Heaven's reality is made visible.
            </p>

            <div className="intro-reveal mt-6 flex flex-row gap-3 lg:mt-9 [&_a]:gap-0" style={{ animationDelay: "1.05s" }}>
              <Button asChild size="lg" className="rounded-full bg-gold px-6 py-5 font-heading text-sm sm:text-base lg:px-10 lg:py-6 lg:text-lg font-bold text-gold-foreground shadow-gold transition-all hover:scale-105 hover:bg-gold-light">
                <Link to="/registration">Register<span className="hidden lg:inline">&nbsp;Now</span></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-secondary-foreground/30 bg-ink/25 px-6 py-5 font-heading text-sm sm:text-base lg:px-10 lg:py-6 lg:text-lg font-semibold text-secondary-foreground transition-all hover:scale-105 hover:bg-secondary-foreground/10">
                <a href="#about">Explore<span className="hidden lg:inline">&nbsp;the Conference</span></a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to content"
        className="absolute bottom-6 left-1/2 hidden lg:block -translate-x-1/2 text-white/60 hover:text-gold transition-colors animate-float z-10"
      >
        <ChevronDown className="w-7 h-7" />
      </a>
    </section>
  );
};

export default Hero;
