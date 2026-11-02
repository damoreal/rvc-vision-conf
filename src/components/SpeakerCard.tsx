import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";

interface Speaker {
  name: string;
  designation: string;
  photo: string;
  bio: string;
}

interface SpeakerCardProps {
  speaker: Speaker;
}

const SpeakerCard = ({ speaker }: SpeakerCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-gold transition-all duration-500 hover:-translate-y-2 h-[440px]"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Portrait photo */}
        <img
          src={speaker.photo}
          alt={speaker.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Dark emerald scrim */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(170,45%,7%,0.05)_35%,hsl(170,45%,7%,0.85)_100%)]"></div>
        {/* Gold edge on hover */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gold/70 transition-colors duration-500 pointer-events-none"></div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="hidden group-hover:flex items-center gap-2 text-gold text-[10px] font-heading font-bold uppercase tracking-[0.25em] mb-2">
            <Sparkles className="w-3 h-3" />
            Ministering
          </div>
          <h3 className="font-serif text-2xl font-bold text-white leading-snug">
            {speaker.name}
          </h3>
          <p className="text-sm text-gold-light mt-1">{speaker.designation}</p>
          <span className="inline-block mt-3 text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-white/70 group-hover:text-gold group-hover:underline underline-offset-4 transition-colors">
            See bio →
          </span>
        </div>
      </div>

      {/* Bio Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl font-bold">{speaker.name}</DialogTitle>
            <p className="text-muted-foreground">{speaker.designation}</p>
          </DialogHeader>
          <div className="mt-2">
            <img
              src={speaker.photo}
              alt={speaker.name}
              className="w-full h-72 object-cover rounded-xl mb-4"
            />
            <p className="text-foreground leading-relaxed">{speaker.bio}</p>
          </div>
          <Button
            asChild
            className="mt-4 rounded-full bg-gold text-gold-foreground hover:bg-gold/90 font-heading font-bold"
          >
            <a href="/registration">Register for RVC 2026</a>
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SpeakerCard;
