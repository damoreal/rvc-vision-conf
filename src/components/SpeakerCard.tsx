import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="relative h-[450px] cursor-pointer perspective-1000"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front of card */}
          <div className="absolute w-full h-full backface-hidden bg-card border border-border rounded-xl overflow-hidden shadow-lg">
            <img
              src={speaker.photo}
              alt={speaker.name}
              className="w-full h-72 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-2">{speaker.name}</h3>
              <p className="text-sm text-muted-foreground">{speaker.designation}</p>
            </div>
          </div>

          {/* Back of card */}
          <div className="absolute w-full h-full backface-hidden bg-gradient-hero rounded-xl p-6 flex flex-col items-center justify-center rotate-y-180">
            <h3 className="text-2xl font-bold text-primary-foreground mb-4 text-center">
              {speaker.name}
            </h3>
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="outline"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              See Bio
            </Button>
          </div>
        </div>
      </div>

      {/* Bio Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{speaker.name}</DialogTitle>
            <p className="text-muted-foreground">{speaker.designation}</p>
          </DialogHeader>
          <div className="mt-4">
            <img
              src={speaker.photo}
              alt={speaker.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-foreground leading-relaxed whitespace-pre-line">{speaker.bio}</p>
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </>
  );
};

export default SpeakerCard;
