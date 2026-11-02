import SpeakerCard from "./SpeakerCard";

const speakers = [
  {
    name: "Pastor John Doe",
    designation: "Senior Pastor, Faith Assembly",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=560&fit=crop",
    bio: "Pastor John Doe is a renowned speaker and teacher with over 20 years of ministry experience. His passion is to see believers walk in their divine authority and see God's promises made manifest in every area of life.",
  },
  {
    name: "Dr. Sarah Williams",
    designation: "Author & Conference Speaker",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=560&fit=crop",
    bio: "Dr. Sarah Williams is an internationally recognized author and speaker. Her teaching ministry has brought breakthrough to countless individuals seeking a deeper relationship with God and supernatural living.",
  },
  {
    name: "Prophet David Emmanuel",
    designation: "Founder, Kingdom Advancement Ministries",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=560&fit=crop",
    bio: "Prophet David Emmanuel operates in the prophetic with remarkable accuracy and power. His ministry is characterized by powerful demonstrations of God's glory and supernatural breakthroughs.",
  },
  {
    name: "Pastor Grace Okonkwo",
    designation: "Lead Pastor, The Godhouse Centre",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=560&fit=crop",
    bio: "Pastor Grace Okonkwo is the visionary leader of The Godhouse Centre. Her heart is to raise a generation of believers who understand their identity in Christ and walk in the fullness of their calling.",
  },
];

const Speakers = () => {
  return (
    <section id="speakers" className="py-24 bg-gradient-section relative overflow-hidden">
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <p className="text-gold font-heading font-bold text-xs tracking-[0.3em] uppercase mb-4">
            Ministers & Speakers
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Meet the Ministers
          </h2>
          <div className="h-1 w-24 bg-gradient-gold mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Anointed ministers bringing spirit-inspired teachings and powerful impartation
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.name} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers;
