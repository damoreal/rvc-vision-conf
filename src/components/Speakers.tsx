import SpeakerCard from "./SpeakerCard";

const Speakers = () => {
  const speakers = [
    {
      name: "Pastor John Doe",
      designation: "Senior Pastor, Faith Assembly",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      bio: "Pastor John Doe is a renowned speaker and teacher with over 20 years of ministry experience. He has impacted thousands of lives through his powerful teaching on Kingdom principles and spiritual transformation. His passion is to see believers walk in their divine authority and manifest Heaven on Earth.",
    },
    {
      name: "Dr. Sarah Williams",
      designation: "Author & Conference Speaker",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "Dr. Sarah Williams is an internationally recognized author and speaker. She has written several bestselling books on faith, healing, and divine encounters. Her teaching ministry has brought breakthrough to countless individuals seeking a deeper relationship with God and supernatural living.",
    },
    {
      name: "Prophet David Emmanuel",
      designation: "Founder, Kingdom Advancement Ministries",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      bio: "Prophet David Emmanuel operates in the prophetic with remarkable accuracy and power. He has ministered across continents, bringing words of knowledge, healing, and deliverance. His ministry is characterized by powerful demonstrations of God's glory and supernatural breakthroughs.",
    },
    {
      name: "Pastor Grace Okonkwo",
      designation: "Lead Pastor, The Godhouse Centre",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      bio: "Pastor Grace Okonkwo is the visionary leader of The Godhouse Centre. Her heart is to raise a generation of believers who understand their identity in Christ and walk in the fullness of their calling. She is known for her practical teaching and genuine love for people.",
    },
  ];

  return (
    <section id="speakers" className="py-20 bg-gradient-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Meet Our Speakers
          </h2>
          <div className="h-1 w-24 bg-gradient-hero mx-auto mb-8 rounded-full"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Anointed ministers bringing fresh revelations and powerful impartation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {speakers.map((speaker, index) => (
            <SpeakerCard key={index} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers;
