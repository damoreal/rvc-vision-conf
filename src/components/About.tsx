import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Radio } from "lucide-react";
import servicePreaching from "@/assets/service-preaching.jpg.asset.json";
import worshipTeam from "@/assets/worship-team.jpg.asset.json";
import worshipper from "@/assets/worshipper-praying.jpg.asset.json";
import minister from "@/assets/minister-preaching.jpg.asset.json";

const stats = [
  { value: "5", label: "Days of Impact" },
  { value: "8", label: "Sessions" },
  { value: "3", label: "Live Platforms" },
  { value: "1000+", label: "Believers Expected" },
];

const About = () => {
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

          {/* Photo collage */}
          <div className="relative h-[480px] md:h-[560px] hidden sm:block">
            <img
              src={servicePreaching.url}
              alt="Preaching session at The Godhouse Centre"
              className="absolute top-0 left-0 w-[62%] rounded-2xl shadow-2xl border-4 border-white object-cover h-[58%]"
            />
            <img
              src={worshipTeam.url}
              alt="Worship team ministering"
              className="absolute top-[16%] right-0 w-[42%] rounded-2xl shadow-2xl border-4 border-white object-cover h-[42%] rotate-3"
            />
            <img
              src={worshipper.url}
              alt="A worshipper in prayer"
              className="absolute bottom-0 left-[8%] w-[34%] rounded-2xl shadow-2xl border-4 border-white object-cover h-[40%] -rotate-3"
            />
            <img
              src={minister.url}
              alt="Minister on stage"
              className="absolute bottom-[2%] right-[6%] w-[36%] rounded-2xl shadow-2xl border-4 border-white object-cover h-[44%]"
            />
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
