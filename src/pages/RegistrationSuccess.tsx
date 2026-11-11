import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Home, Sparkles, ArrowRight, Check } from "lucide-react";
import hero from "@/assets/hero-worship.jpg";

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden><path d="M3.6 1.8 13.8 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1Zm11.3 11.3 2.4 2.4-11.2 6.4 8.8-8.8Zm3.6-3.4 2.6 1.5c.8.5.8 1.6 0 2.1l-2.6 1.5-2.7-2.8 2.7-2.3ZM6.1 2.1l11.2 6.4-2.4 2.4-8.8-8.8Z"/></svg>
);
const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden><path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.1ZM13.9 4.9c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5Z"/></svg>
);

const RegistrationSuccess = () => {
  const name = (useLocation().state as { name?: string } | null)?.name;
  return (
    <main className="relative min-h-screen bg-ink text-secondary-foreground overflow-hidden">
      <img src={hero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25 ken-burns" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/85 to-ink" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] rounded-full bg-gold/10 blur-3xl breathe-gold" />

      <nav className="relative z-10 container mx-auto px-4 py-5 flex justify-between gap-3">
        <Link to="/registration" className="glass-light rounded-full px-4 py-2 text-sm font-heading font-semibold inline-flex items-center gap-2 hover:border-gold transition-colors">
          <ArrowLeft className="w-4 h-4" /> Registration
        </Link>
        <Link to="/" className="glass-light rounded-full px-4 py-2 text-sm font-heading font-semibold inline-flex items-center gap-2 hover:border-gold transition-colors">
          <Home className="w-4 h-4" /> Conference
        </Link>
      </nav>

      <section className="relative z-10 container mx-auto px-4 pt-8 pb-16 max-w-3xl text-center">
        <div className="intro-reveal mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center shadow-[var(--shadow-gold)]">
          <Check className="w-10 h-10 text-gold-foreground" strokeWidth={3} />
        </div>
        <p className="intro-reveal text-gold font-heading font-bold text-xs tracking-[0.3em] uppercase mb-3" style={{ animationDelay: "120ms" }}>
          Congratulations{name ? `, ${name.split(" ")[0]}` : ""}
        </p>
        <h1 className="intro-reveal font-display uppercase text-5xl sm:text-7xl leading-[0.95] mb-4" style={{ animationDelay: "220ms" }}>
          You're <span className="text-gold text-glow-gold">RVC-bound</span>
        </h1>
        <p className="intro-reveal text-secondary-foreground/70 mb-12" style={{ animationDelay: "320ms" }}>
          Manifestation · 9th–13th December 2026 · The Godhouse Centre, Warri
        </p>

        <div className="grid sm:grid-cols-2 gap-5 text-left">
          <Link to="/invite" className="intro-reveal group glass-dark rounded-3xl p-7 hover:border-gold/60 transition-all hover:-translate-y-1" style={{ animationDelay: "450ms" }}>
            <Sparkles className="w-7 h-7 text-gold mb-4" />
            <h2 className="font-display uppercase text-2xl mb-2">Create your invite</h2>
            <p className="text-sm text-secondary-foreground/70 mb-6">Turn your photo into an "I am RVC-bound" design and share it.</p>
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-gold text-gold-foreground px-5 py-2.5 font-heading font-bold text-sm">
              Create Invite <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <div className="intro-reveal glass-dark rounded-3xl p-7" style={{ animationDelay: "560ms" }}>
            <h2 className="font-display uppercase text-2xl mb-2">Get the Wholeword App</h2>
            <p className="text-sm text-secondary-foreground/70 mb-6">Keep up with upcoming events and watch every session live.</p>
            <div className="flex flex-col gap-3">
              <a href="https://play.google.com/store/apps/details?id=com.wholewordapp.godhouse&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl bg-background text-foreground px-4 py-2.5 hover:bg-gold transition-colors">
                <PlayIcon /><span className="leading-tight"><span className="block text-[10px] uppercase tracking-wider opacity-70">Get it on</span><span className="font-heading font-bold">Google Play</span></span>
              </a>
              <a href="https://apps.apple.com/se/app/wholeword-app/id6756170057?l=en-GB&platform=vision" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl bg-background text-foreground px-4 py-2.5 hover:bg-gold transition-colors">
                <AppleIcon /><span className="leading-tight"><span className="block text-[10px] uppercase tracking-wider opacity-70">Download on the</span><span className="font-heading font-bold">App Store</span></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RegistrationSuccess;
