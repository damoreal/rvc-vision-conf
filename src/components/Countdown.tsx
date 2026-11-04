import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Opening session: Wednesday 9th December 2026, 5pm WAT (UTC+1)
    const targetDate = new Date("2026-12-09T17:00:00+01:00");

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <section id="countdown" className="relative py-24 bg-ink overflow-hidden">
      {/* Emerald / gold ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl breathe-gold"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl breathe-gold"></div>
        <div
          className="ember"
          style={{ left: "12%", bottom: "-2%", width: 4, height: 4, animationDuration: "11s" }}
        ></div>
        <div
          className="ember"
          style={{ left: "42%", bottom: "-2%", width: 3, height: 3, animationDuration: "14s", animationDelay: "3s" }}
        ></div>
        <div
          className="ember"
          style={{ left: "72%", bottom: "-2%", width: 5, height: 5, animationDuration: "12s", animationDelay: "6s" }}
        ></div>
        <div
          className="ember"
          style={{ left: "88%", bottom: "-2%", width: 3, height: 3, animationDuration: "16s", animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70"></div>
            <Sparkles className="w-6 h-6 text-gold text-glow-gold" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/70"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-white mb-4">
            Countdown to{" "}
            <span className="font-display tracking-wide text-gold text-glow-gold">
              RVC 2026
            </span>
          </h2>
          <p className="text-lg text-white/70 font-serif italic max-w-xl mx-auto">
            The manifestation begins soon. Are you ready?
          </p>
        </div>

        {/* Countdown Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {timeUnits.map((unit, index) => (
            <div
              key={unit.label}
              className="relative group animate-scale-in"
              style={{ animationDelay: `${index * 130}ms` }}
            >
              {/* Gold aura */}
              <div className="absolute -inset-1 bg-gradient-to-br from-gold/60 via-gold/10 to-emerald-500/30 rounded-3xl blur-lg opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>

              {/* Glass card */}
              <div className="relative glass-dark rounded-3xl p-6 md:p-8 text-center hover:scale-105 transition-all duration-300 shadow-xl">
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold/60 rounded-tl-lg"></div>
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-gold/60 rounded-tr-lg"></div>
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-gold/60 rounded-bl-lg"></div>
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold/60 rounded-br-lg"></div>

                <div className="text-5xl md:text-6xl lg:text-7xl font-display text-white text-glow-gold tabular-nums leading-none mb-3">
                  {String(unit.value).padStart(2, "0")}
                </div>
                <div className="text-xs md:text-sm font-heading font-bold text-gold uppercase tracking-[0.3em]">
                  {unit.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-gold/40"></div>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gold/60 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }}></div>
              <div className="w-2 h-2 bg-gold/30 rounded-full animate-pulse" style={{ animationDelay: "0.6s" }}></div>
            </div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-gold/40"></div>
          </div>
          <p className="text-sm text-white/60 font-heading font-bold tracking-[0.25em] uppercase">
            Wednesday 9th — Sunday 13th December 2026
          </p>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
