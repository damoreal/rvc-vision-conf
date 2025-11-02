import godhouseLogo from "@/assets/godhouse-logo.png";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About RVC 2025
          </h2>
          <div className="h-1 w-24 bg-gradient-hero mx-auto mb-8 rounded-full"></div>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            The Running with the Vision Conference is Africa's premier tech ecosystem platform, 
            designed to bring Heaven's transformative power into every aspect of our lives. 
            Join us for five life-changing days of worship, teaching, and encounters with God's presence.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="text-4xl font-bold text-primary mb-2">5</div>
              <div className="text-sm font-medium text-muted-foreground">Days of Impact</div>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="text-4xl font-bold text-secondary mb-2">10</div>
              <div className="text-sm font-medium text-muted-foreground">Sessions Daily</div>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-shadow">
              <div className="text-4xl font-bold text-accent mb-2">1000+</div>
              <div className="text-sm font-medium text-muted-foreground">Expected Attendees</div>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <img src={godhouseLogo} alt="The Godhouse Centre" className="h-16 w-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
