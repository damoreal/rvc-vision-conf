import { MapPin, Navigation, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Venue = () => {
  const mapUrl =
    "https://www.google.com/maps/search/?api=1&query=The+Godhouse+Centre%2C+2+Indian+Street%2C+off+Jakpa+Road%2C+Effurun-Warri%2C+Delta+State%2C+Nigeria";

  return (
    <section id="venue" className="py-24 bg-gradient-section relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-gold font-heading font-bold text-xs tracking-[0.3em] uppercase mb-4">
            <Navigation className="w-4 h-4" />
            The Venue
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Find Us in Warri
          </h2>
          <div className="h-1 w-24 bg-gradient-gold mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Address card */}
          <div className="bg-card border border-border rounded-3xl p-10 shadow-sm hover:shadow-xl hover:border-gold/50 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center mb-6">
              <MapPin className="w-7 h-7 text-gold" />
            </div>
            <h3 className="font-serif text-3xl font-bold text-foreground mb-3">
              The Godhouse Centre, Warri
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              2, Indian Street, off Jakpa Road, by Mansal Hotel,
              Effurun-Warri, Delta State, Nigeria.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-accent" />
                Doors open one hour before every session
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-accent" />
                Ample parking on site and nearby overflow parking
              </div>
            </div>

            <Button
              asChild
              className="rounded-full bg-ink text-background hover:bg-accent font-heading font-bold transition-all"
            >
              <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                Open in Google Maps
              </a>
            </Button>
          </div>

          {/* Map-style card */}
          <div className="relative rounded-3xl overflow-hidden border border-border shadow-sm min-h-[360px] bg-ink">
            {/* Stylized map backdrop */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_60%_40%,hsl(166,50%,22%)_0%,hsl(170,45%,7%)_70%)]"></div>
            {/* Route lines */}
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300" fill="none">
              <path d="M0 80 H150 V180 H400" stroke="hsl(41,78%,61%)" strokeWidth="2" strokeDasharray="8 8" />
              <path d="M80 300 V140 H220 V0" stroke="hsl(46,88%,75%)" strokeWidth="2" strokeDasharray="6 10" />
              <path d="M0 240 H320" stroke="hsl(166,55%,45%)" strokeWidth="2" strokeDasharray="10 8" />
            </svg>
            {/* Center pin */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gold/40 blur-xl breathe-gold"></div>
                <div className="relative w-16 h-16 rounded-full bg-gold flex items-center justify-center shadow-gold">
                  <MapPin className="w-8 h-8 text-gold-foreground" />
                </div>
              </div>
              <div className="mt-4 glass-dark rounded-full px-5 py-2 text-white text-sm font-heading font-bold tracking-wide">
                RVC 2026 · The Godhouse Centre
              </div>
            </div>
            {/* Corner label */}
            <div className="absolute bottom-4 left-4 text-white/50 text-xs font-heading font-bold uppercase tracking-[0.2em]">
              Effurun-Warri · Delta State
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;
