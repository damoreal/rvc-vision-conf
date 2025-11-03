import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Schedule = () => {
  const schedule = [
    {
      day: "Day 1",
      date: "December 10, 2025",
      sessions: [
        { time: "4:00 PM", title: "Opening Ceremony & Worship", type: "Evening Session" },
      ],
    },
    {
      day: "Day 2 - 4",
      date: "December 11 - 13, 2025",
      sessions: [
        { time: "9:00 AM", title: "Morning Session", type: "Morning" },
        { time: "4:00 PM", title: "Evening Session", type: "Evening" },
      ],
    },
    {
      day: "Day 5",
      date: "December 14, 2025",
      sessions: [
        { time: "9:00 AM", title: "Grand Finale & Commissioning Service", type: "Morning Session" },
      ],
    },
  ];

  return (
    <section id="schedule" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Conference Schedule
          </h2>
          <div className="h-1 w-24 bg-gradient-hero mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Five powerful days of teaching, worship, and transformation
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-6">
          {schedule.map((day, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-primary animate-pulse" />
                <div>
                  <h3 className="text-xl font-bold text-foreground">{day.day}</h3>
                  <p className="text-sm text-muted-foreground">{day.date}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {day.sessions.map((session, sessionIndex) => (
                  <div
                    key={sessionIndex}
                    className="p-4 bg-muted/30 rounded-lg border border-border/50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-primary">{session.time}</span>
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        {session.type}
                      </span>
                    </div>
                    <p className="text-foreground font-medium">{session.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/registration">
            <Button size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90 text-lg px-8 py-6">
              Register Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
