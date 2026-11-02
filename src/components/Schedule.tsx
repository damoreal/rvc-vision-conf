import { useState } from "react";
import { CalendarDays, Moon, Sun, Trophy, DoorOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const schedule = [
  {
    id: "opening",
    date: "Wednesday, December 9th",
    badge: "Day 1",
    icon: DoorOpen,
    sessions: [
      { time: "5:00 PM", title: "Opening Ceremony & Worship", type: "Evening Session" },
    ],
  },
  {
    id: "main",
    date: "Thursday 10th – Saturday 12th",
    badge: "Days 2 – 4",
    icon: Sun,
    sessions: [
      { time: "9:00 AM", title: "Morning Session — Spirit-inspired Teachings", type: "Morning", icon: Sun },
      { time: "4:00 PM", title: "Evening Session — Impartation & Encounters", type: "Evening", icon: Moon },
    ],
  },
  {
    id: "finale",
    date: "Sunday, December 13th",
    badge: "Day 5",
    icon: Trophy,
    sessions: [
      { time: "9:00 AM", title: "Grand Finale & Commissioning Service", type: "Morning Session" },
    ],
  },
];

const Schedule = () => {
  const [active, setActive] = useState("main");

  return (
    <section id="schedule" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <p className="text-gold font-heading font-bold text-xs tracking-[0.3em] uppercase mb-4">
            Five Days of Encounter
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Conference Schedule
          </h2>
          <div className="h-1 w-24 bg-gradient-gold mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Teachings, worship and impartation — morning and evening, every day.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {schedule.map((day) => {
            const Icon = day.icon;
            const isOpen = active === day.id;
            return (
              <div
                key={day.id}
                className={`bg-card border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-gold/60 shadow-gold" : "border-border shadow-sm hover:border-gold/40"
                }`}
              >
                <button
                  onClick={() => setActive(isOpen ? "" : day.id)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isOpen ? "bg-gold text-gold-foreground" : "bg-muted text-accent"
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${isOpen ? "animate-none" : "animate-float"}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-lg md:text-xl font-heading font-bold text-foreground">
                          {day.badge}
                        </h3>
                        <span className="text-xs font-heading font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
                          {day.date}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {day.sessions.length} session{day.sessions.length > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <CalendarDays
                    className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-gold" : "text-muted-foreground"
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 space-y-4">
                      {day.sessions.map((session, i) => {
                        const SessionIcon = session.icon ?? Sun;
                        return (
                          <div
                            key={i}
                            className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-xl bg-muted/40 border border-border/60"
                          >
                            <div className="flex items-center gap-3 sm:w-56 flex-shrink-0">
                              <SessionIcon className="w-5 h-5 text-gold" />
                              <span className="font-heading font-bold text-foreground text-lg">
                                {session.time}
                              </span>
                            </div>
                            <div className="flex-1">
                              <p className="text-foreground font-medium">{session.title}</p>
                              <span className="inline-block mt-2 text-xs font-heading font-bold uppercase tracking-widest text-accent bg-accent/10 px-3 py-1 rounded-full">
                                {session.type}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-gold text-gold-foreground hover:bg-gold/90 font-heading font-bold text-lg px-10 py-6 shadow-gold hover:scale-105 transition-all"
          >
            <Link to="/registration">Register for the Conference</Link>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Physical attendance or streamed live — join from anywhere.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
