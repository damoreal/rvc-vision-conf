import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Radio } from "lucide-react";
import conferenceTeaching from "@/assets/conference_teaching_clean.jpg.asset.json";
import worshipTeam from "@/assets/worship-team.jpg.asset.json";
import worshipper from "@/assets/worshipper-praying.jpg.asset.json";
import minister from "@/assets/hero_scene_minister.jpeg.asset.json";
import prayerScene from "@/assets/hero_scene_prayer.jpg.asset.json";
import { projectAssetUrl } from "@/lib/utils";

const stats = [
  { value: "5", label: "Days of Impact" },
  { value: "8", label: "Sessions" },
  { value: "3", label: "Live Platforms" },
  { value: "1000+", label: "Believers Expected" },
];

/* Full-bleed photo grid (desktop) — Reboot-style mosaic */
const gridPhotos = [
  { src: projectAssetUrl(conferenceTeaching.url), alt: "A conference teaching session", span: "col-span-3" },
  { src: projectAssetUrl(worshipTeam.url), alt: "Worship team ministering", span: "col-span-3" },
  { src: projectAssetUrl(prayerScene.url), alt: "A believer praying at the conference", span: "col-span-2" },
  { src: projectAssetUrl(minister.url), alt: "Minister on stage", span: "col-span-2" },
  { src: projectAssetUrl(worshipper.url), alt: "Worshipper in prayer", span: "col-span-2" },
];

/* Mobile tile: reveals on scroll, colours in while centred on screen, tap to spotlight */
const MobileTile = ({ src, alt, wide, index, lit, onTap }: { src: string; alt: string; wide: boolean; index: number; lit: boolean; onTap: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [shown, setShown] = useState(false);
  const [centred, setCentred] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reveal = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); reveal.disconnect(); } }, { threshold: 0.01 });
    const focus = new IntersectionObserver(([e]) => setCentred(e.isIntersecting), { rootMargin: "-38% 0px -38% 0px" });
    reveal.observe(el); focus.observe(el);
    return () => { reveal.disconnect(); focus.disconnect(); };
  }, []);
  const colour = lit || centred;
  return (
    <button
      ref={ref}
      type="button"
      onClick={onTap}
      aria-label={alt}
      style={{ transitionDelay: shown ? `${(index % 2) * 120}ms` : "0ms" }}
      className={`group relative overflow-hidden aspect-[3/2] ${wide ? "col-span-2" : ""} block w-full p-0 transition-[transform,opacity] duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? "opacity-100 translate-y-0" : "opacity-60 translate-y-4"
      }`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-[900ms] ease-out ${
          colour ? "grayscale-0 brightness-105 scale-105" : "grayscale brightness-75 scale-100"
        }`}
      />
      <span className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent transition-opacity duration-700 ${colour ? "opacity-0" : "opacity-70"}`} />
      <span className={`pointer-events-none absolute inset-0 ring-1 ring-inset transition-all duration-500 ${colour ? "ring-gold/70" : "ring-gold/0"}`} />
    </button>
  );
};

const About = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width - 0.5) * -14}px`);
    e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height - 0.5) * -14}px`);
  };

  return (
    <section id="about" className="py-24 bg-gradient-section relative overflow-hidden">
      {/* soft emerald wash */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Copy */}
          <div>
            <p className="text-gold font-heading font-bold text-xs tracking-[0.3em] uppercase mb-4">
              About the Conference
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              An interdenominational gathering of believers
            </h2>
            <div className="h-1 w-24 bg-gradient-gold rounded-full mb-8"></div>

            <p className="text-lg text-muted-foreground mb-5 leading-relaxed">
              Running with the Vision Conference (RVC) is an annual believers'
              conference organized by The Godhouse Centre. It features
              spirit-inspired teachings and impartation sessions, empowering
              believers for the work of ministry.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              This year's conference is themed{" "}
              <span className="font-heading font-bold text-foreground">"Manifestation"</span> —
              a call to see God's promises made visible in our lives, our homes
              and our world.
            </p>

            <div className="flex items-center gap-3 mb-8">
              <Radio className="w-5 h-5 text-accent" />
              <p className="text-sm font-medium text-foreground">
                Organized by The Godhouse Missions International — open to all churches and believers.
              </p>
            </div>

            <Button
              asChild
              className="rounded-full bg-ink text-background hover:bg-accent font-heading font-bold px-8 py-4 transition-all group"
            >
              <Link to="/registration">
                Reserve Your Seat
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Stats — big figures beside the copy, Reboot-style */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-8 lg:border-l lg:border-border lg:pl-12">
            {stats.map((s) => (
              <div key={s.label} className="group">
                <div className="font-display text-5xl md:text-6xl text-accent leading-none transition-colors duration-300 group-hover:text-gold">
                  {s.value}
                </div>
                <div className="mt-2 text-xs font-heading font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Mobile photo grid — same gap-free mosaic, tap/scroll to colour */}
      <div className="relative mt-16 -mb-24 grid sm:hidden grid-cols-2 bg-ink">
        {gridPhotos.map((p, i) => {
          const wide = i === 0;
          const lit = active === i;
          return (
            <MobileTile key={p.src} src={p.src} alt={p.alt} wide={wide} index={i} lit={lit} onTap={() => setActive(lit ? null : i)} />
          );
        })}
      </div>

      {/* Desktop/tablet photo grid — full width, gap-free, every photo shown in its landscape frame */}
      <div
        ref={gridRef}
        className="relative mt-20 -mb-24 hidden sm:grid grid-cols-6 bg-ink"
        onMouseLeave={() => setActive(null)}
      >
        {gridPhotos.map((p, i) => (
          <figure
            key={p.src}
            onMouseEnter={() => setActive(i)}
            onMouseMove={handleMove}
            onMouseLeave={(e) => {
              e.currentTarget.style.setProperty("--mx", "0px");
              e.currentTarget.style.setProperty("--my", "0px");
            }}
            style={{ transitionDelay: revealed ? `${i * 110}ms` : "0ms" }}
            className={`group relative overflow-hidden ${p.span} aspect-[3/2] transition-[clip-path,opacity] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              revealed ? "opacity-100 [clip-path:inset(0_0_0_0)]" : "opacity-0 [clip-path:inset(100%_0_0_0)]"
            }`}
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              style={{ transform: "translate3d(var(--mx,0px), var(--my,0px), 0) scale(1.06)" }}
              className={`absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-700 ease-out ${
                active === i ? "grayscale-0 brightness-105" : active === null ? "grayscale brightness-90" : "grayscale brightness-50"
              }`}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-0" />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/60" />
          </figure>
        ))}
      </div>

    </section>
  );
};

export default About;
