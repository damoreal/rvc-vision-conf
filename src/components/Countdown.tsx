import { useEffect, useState } from "react";

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
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto my-12 animate-fade-in">
      <div className="text-center mb-6">
        <p className="text-primary-foreground/90 text-sm md:text-base font-semibold tracking-wider uppercase">
          Conference Begins In
        </p>
      </div>
      
      <div className="grid grid-cols-4 gap-3 md:gap-6">
        {timeUnits.map((unit, index) => (
          <div
            key={unit.label}
            className="relative group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gold/20 rounded-2xl blur-xl group-hover:bg-gold/30 transition-all duration-300"></div>
            
            {/* Card */}
            <div className="relative bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 rounded-2xl p-4 md:p-6 hover:border-gold/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gold/20">
              {/* Value */}
              <div className="text-4xl md:text-6xl lg:text-7xl font-display font-black text-gold mb-2 tabular-nums leading-none">
                {String(unit.value).padStart(2, "0")}
              </div>
              
              {/* Label */}
              <div className="text-xs md:text-sm font-heading font-semibold text-primary-foreground/70 uppercase tracking-wider">
                {unit.label}
              </div>
              
              {/* Decorative corner accents */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-gold/40 rounded-tl-lg"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-gold/40 rounded-br-lg"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Decorative line */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
        <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold/50 to-transparent"></div>
      </div>
    </div>
  );
};

export default Countdown;
