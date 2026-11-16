import SpeakerCard from "./SpeakerCard";
import philipsPhoto from "@/assets/apostle-td-philips.jpg";
import pistisPhoto from "@/assets/pst-theo-pistis-danjuma.jpg";

const speakers = [
  {
    name: "Apostle T.D. Philips",
    designation: "Senior Pastor, The Godhouse Centre",
    photo: philipsPhoto,
    bio: "Apostle Theophilus Danjuma Philips is a dynamic teacher of God's Word, driven by a divine vision to bring the Gospel to every corner of the globe. His ministry is marked by miraculous signs, healings, and the empowering gifts of the Holy Spirit. He leads Godhouse Missions International, headquartered in Warri, Delta State, Nigeria, alongside his wife, Theo'Pistis Danjuma, both deeply passionate about the transformative power of God's Word.",
  },
  {
    name: "Pst. Theo'Pistis Danjuma",
    designation: "Senior Pastor, The Godhouse Centre, Warri",
    photo: pistisPhoto,
    bio: "Pastor Theo'Pistis Danjuma, the Lead Pastor of Godhouse Centre, Warri, is a passionate and insightful teacher of God's Word. Renowned as a passionate teacher of God's word, life coach and counselor, she empowers individuals through the transformative wisdom found in the Scriptures. Her leadership fosters spiritual growth and offers guidance, inspiring positive change in the lives of many.",
  },
];

const Speakers = () => {
  return (
    <section id="speakers" className="py-24 bg-gradient-section relative overflow-hidden">
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <p className="text-gold font-heading font-bold text-xs tracking-[0.3em] uppercase mb-4">
            Your Hosts
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Meet the Hosts
          </h2>
          <div className="h-1 w-24 bg-gradient-gold mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pastor T.D. and Pastor Theo'Pistis Danjuma welcome you to RVC 2026 — spirit-inspired
            teaching, impartation and fresh vision
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.name} speaker={speaker} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Speakers;
