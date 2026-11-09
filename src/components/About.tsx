import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Radio, Sparkles } from "lucide-react";
import conferenceTeaching from "@/assets/conference_teaching.jpg.asset.json";
import worshipTeam from "@/assets/worship-team.jpg.asset.json";
import worshipper from "@/assets/worshipper-praying.jpg.asset.json";
import minister from "@/assets/hero_scene_minister.jpeg.asset.json";
import prayerScene from "@/assets/hero_scene_prayer.jpg.asset.json";
import flyerAsset from "@/assets/rvc2026-flyer.jpg.asset.json";
import { projectAssetUrl } from "@/lib/utils";

const stats = [
  { value: "5", label: "Days of Impact" },
  { value: "8", label: "Sessions" },
  { value: "3", label: "Live Platforms" },
  { value: "1000+", label: "Believers Expected" },
];

/* Each collage layer floats at its own depth, reacting to scroll and mouse */
const layers = [
  {
    src: projectAssetUrl(conferenceTeaching.url),
    alt: "A conference teaching session",
    className: "col-span-7 row-span-2",
    depth: 0.55,
    rotate: 0,
  },
  {
    src: projectAssetUrl(worshipTeam.url),
    alt: "Worship team ministering",
    className: "col-span-5 row-span-1",
    depth: 1.0,
    rotate: 0,
  },
  {
    src: projectAssetUrl(prayerScene.url),
    alt: "A believer praying at the conference",
    className: "col-span-3 row-span-1",
    depth: 1.5,
    rotate: 0,
  },
  {
    src: projectAssetUrl(minister.url),
    alt: "Minister on stage",
    className: "col-span-2 row-span-1",
    depth: 0.8,
    rotate: 0,
  },
];

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // ~0 when the section is centred in the viewport
        setScrollProgress((rect.top + rect.height / 2 - vh / 2) / vh);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
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

          {/* Interactive photo collage — moves with scroll and mouse */}
          <div
            ref={sectionRef}
            onMouseMove={handleMouse}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            className="relative hidden h-[500px] grid-cols-12 grid-rows-2 gap-3 sm:grid md:h-[580px]"
          >
            {layers.map((layer) => (
              <figure
                key={layer.src}
                style={layerStyle(layer.depth, layer.rotate)}
                className={`relative overflow-hidden rounded-sm border border-border/70 shadow-xl ${layer.className}`}
              >
                <img
                  src={layer.src}
                  alt={layer.alt}
                  className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                />
              </figure>
            ))}
          </div>

          {/* Mobile fallback — flyer first, then a simple grid */}
          <div className="sm:hidden space-y-4">
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

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto">
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-6 bg-card rounded-2xl border border-border text-center shadow-sm hover:shadow-lg hover:border-gold/50 transition-all"
            >
              <div className="text-4xl font-display text-accent mb-2">{s.value}</div>
              <div className="text-xs font-heading font-bold uppercase tracking-widest text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
