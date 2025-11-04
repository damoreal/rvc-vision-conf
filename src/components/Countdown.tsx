import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

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
    const targetDate = new Date("2025-12-10T09:00:00+01:00"); // 9am WAT

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
    { value: timeLeft.days, label: "Days", gradient: "from-primary via-accent to-primary" },
    { value: timeLeft.hours, label: "Hours", gradient: "from-accent via-gold to-accent" },
    { value: timeLeft.minutes, label: "Minutes", gradient: "from-gold via-primary to-gold" },
    { value: timeLeft.seconds, label: "Seconds", gradient: "from-primary via-accent to-primary" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <Clock className="w-8 h-8 text-gold animate-pulse" />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-foreground mb-3">
            Countdown to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-gold">RVC 2025</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light italic max-w-2xl mx-auto">
            The transformation begins soon. Are you ready?
          </p>
        </div>
        
        {/* Countdown Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {timeUnits.map((unit, index) => (
            <div
              key={unit.label}
              className="relative group animate-scale-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Animated gradient border */}
              <div className={`absolute inset-0 bg-gradient-to-br ${unit.gradient} rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse`}></div>
              
              {/* Card */}
              <div className="relative bg-card border-2 border-border rounded-3xl p-6 md:p-8 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl backdrop-blur-sm">
                {/* Animated corner decorations */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-gold rounded-tl-xl opacity-60"></div>
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-primary rounded-tr-xl opacity-60"></div>
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-accent rounded-bl-xl opacity-60"></div>
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-gold rounded-br-xl opacity-60"></div>
                </div>
                
                {/* Value with gradient */}
                <div className={`text-5xl md:text-6xl lg:text-7xl font-display font-black bg-gradient-to-br ${unit.gradient} bg-clip-text text-transparent mb-3 tabular-nums leading-none drop-shadow-lg`}>
                  {String(unit.value).padStart(2, "0")}
                </div>
                
                {/* Label */}
                <div className="text-sm md:text-base font-heading font-bold text-muted-foreground uppercase tracking-[0.2em]">
                  {unit.label}
                </div>
                
                {/* Pulse indicator */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className={`w-2 h-2 bg-gradient-to-r ${unit.gradient} rounded-full animate-ping`}></div>
                  <div className={`w-2 h-2 bg-gradient-to-r ${unit.gradient} rounded-full absolute top-0 left-0`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom decorative elements */}
        <div className="mt-16 flex flex-col items-center gap-6 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.3s" }}></div>
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" style={{ animationDelay: "0.6s" }}></div>
            </div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          </div>
          <p className="text-sm text-muted-foreground font-medium tracking-wider uppercase">
            December 10th - 14th, 2025
          </p>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
