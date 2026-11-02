import { Tv, Youtube, Facebook, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";

const platforms = [
  {
    name: "Wholeword TV",
    description: "The official media arm of The Godhouse Centre — every session streamed live and in full.",
    icon: Tv,
    href: "https://www.wholewordtv.com",
    cta: "Watch on Wholeword TV",
  },
  {
    name: "YouTube",
    description: "Subscribe to The Godhouse Centre channel and join the sessions live from anywhere in the world.",
    icon: Youtube,
    href: "https://www.youtube.com/results?search_query=the+godhouse+centre",
    cta: "Watch on YouTube",
  },
  {
    name: "Facebook Live",
    description: "Follow The Godhouse Centre on Facebook and catch every morning and evening session live.",
    icon: Facebook,
    href: "https://www.facebook.com/theGodHouseCentre/",
    cta: "Watch on Facebook",
  },
];

const Streaming = () => {
  return (
    <section id="streaming" className="relative py-24 bg-ink overflow-hidden">
      {/* Ambient glows + embers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl breathe-gold"></div>
        <div className="absolute bottom-10 left-1/5 w-80 h-80 bg-gold/10 rounded-full blur-3xl breathe-gold"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-gold font-heading font-bold text-xs tracking-[0.3em] uppercase mb-4">
            <Wifi className="w-4 h-4" />
            Physical &amp; Virtual
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Join from Anywhere
          </h2>
          <div className="h-1 w-24 bg-gradient-gold mx-auto rounded-full"></div>
          <p className="text-lg text-white/70 mt-6 max-w-2xl mx-auto">
            Not in Warri? Every session of RVC 2026 streams live on three
            platforms — pick yours and connect with thousands of believers worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {platforms.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className="group glass-dark rounded-3xl p-8 text-center hover:scale-105 hover:border-gold/40 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center group-hover:bg-gold group-hover:text-gold-foreground transition-colors">
                  <Icon className="w-8 h-8 text-gold group-hover:text-gold-foreground transition-colors" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">{p.name}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">{p.description}</p>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full glass-light text-white border-white/25 hover:bg-gold hover:text-gold-foreground hover:border-gold font-heading font-semibold transition-all"
                >
                  <a href={p.href} target="_blank" rel="noopener noreferrer">
                    {p.cta}
                  </a>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Streaming;
