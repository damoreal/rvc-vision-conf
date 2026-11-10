import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Radio, Sparkles } from "lucide-react";
import conferenceTeaching from "@/assets/conference_teaching_clean.jpg.asset.json";
import worshipTeam from "@/assets/worship-team.jpg.asset.json";
import worshipper from "@/assets/worshipper-praying.jpg.asset.json";
import minister from "@/assets/hero_scene_minister.jpeg.asset.json";
import prayerScene from "@/assets/hero_scene_prayer.jpg.asset.json";
import stageScene from "@/assets/hero_scene_stage.jpg.asset.json";
import flyerAsset from "@/assets/rvc2026-flyer.jpg.asset.json";
import { projectAssetUrl } from "@/lib/utils";

const stats = [
  { value: "5", label: "Days of Impact" },
  { value: "8", label: "Sessions" },
  { value: "3", label: "Live Platforms" },
  { value: "1000+", label: "Believers Expected" },
];

/* Full-bleed photo grid (desktop) — Reboot-style mosaic */
const gridPhotos = [
  { src: projectAssetUrl(conferenceTeaching.url), alt: "A conference teaching session", span: "col-span-2" },
  { src: projectAssetUrl(worshipTeam.url), alt: "Worship team ministering", span: "col-span-1" },
  { src: projectAssetUrl(prayerScene.url), alt: "A believer praying at the conference", span: "col-span-1" },
  { src: projectAssetUrl(minister.url), alt: "Minister on stage", span: "col-span-1" },
  { src: projectAssetUrl(worshipper.url), alt: "Worshipper in prayer", span: "col-span-1" },
  { src: projectAssetUrl(stageScene.url), alt: "Conference stage in worship", span: "col-span-2" },
];

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

  return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const handleMouse = (e: React.MouseEvent) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTilt({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    });
  };

  const layerStyle = (depth: number, rotate: number): React.CSSProperties => ({
    transform: `translate3d(${tilt.x * depth * 36}px, ${
      scrollProgress * depth * 90 + tilt.y * depth * 28
    }px, 0) rotate(${rotate}deg)`,
    willChange: "transform",
  });

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

          {/* Mobile fallback — flyer first, then a simple grid */}
          <div className="sm:hidden space-y-4 lg:col-span-2">
            <figure className="relative rounded-xl overflow-hidden border border-gold/40 shadow-lg">
              <img src={projectAssetUrl(flyerAsset.url)} alt="RVC 2026 Manifestation official flyer" className="w-full" />
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-ink/80 rounded-full px-3 py-1">
                <Sparkles className="w-3 h-3 text-gold" />
                <span className="text-gold text-[10px] font-heading font-bold tracking-[0.15em] uppercase">
                  Official Flyer
                </span>
              </div>
            </figure>
            <div className="grid grid-cols-2 gap-3">
              <img src={projectAssetUrl(conferenceTeaching.url)} alt="Conference teaching" className="rounded-xl w-full h-36 object-cover" />
              <img src={projectAssetUrl(worshipTeam.url)} alt="Worship team" className="rounded-xl w-full h-36 object-cover" />
              <img src={projectAssetUrl(worshipper.url)} alt="Worshipper in prayer" className="rounded-xl w-full h-36 object-cover" />
              <img src={projectAssetUrl(minister.url)} alt="Minister on stage" className="rounded-xl w-full h-36 object-cover" />
            </div>
          </div>
        </div>

        </div>
      </div>

      {/* Desktop/tablet photo grid — full width, gap-free, every photo shown in its landscape frame */}
      <div
        ref={gridRef}
        className="relative mt-20 hidden sm:grid grid-cols-4 bg-ink"
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
            className={`group relative overflow-hidden ${p.span} ${
              p.span === "col-span-2" ? "aspect-[16/9]" : "aspect-[8/9]"
            } transition-[clip-path,opacity] duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
