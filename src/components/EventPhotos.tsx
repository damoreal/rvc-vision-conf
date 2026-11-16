import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Camera } from "lucide-react";
import conferenceSpeaker from "@/assets/conference_speaker.jpeg";
import apostolicImpartation from "@/assets/apostolic_impartation.jpg";
import totalResurrender from "@/assets/total_resurrender.jpg";
import worshipConference from "@/assets/worship_conference.jpg";
import spiritInspiredPrayers from "@/assets/spirit_inspired_prayers.jpg";
import worshipperPraying from "@/assets/worshipper-praying.jpg";
import worshipperPraying2 from "@/assets/worshipper-praying-2.jpg";

const photos = [
  { src: conferenceSpeaker, caption: "The Word ministered with power" },
  { src: worshipConference, caption: "Worship that fills the room" },
  { src: apostolicImpartation, caption: "Apostolic impartation moments" },
  { src: worshipperPraying2, caption: "Hearts tuned to Heaven" },
  { src: totalResurrender, caption: "Total Resurrender" },
  { src: worshipperPraying, caption: "Deep worship, deep surrender" },
  { src: spiritInspiredPrayers, caption: "Spirit-inspired prayers" },
];

const EventPhotos = () => {
  return (
    <section id="moments" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-gold font-heading font-bold text-xs tracking-[0.3em] uppercase mb-4">
            <Camera className="w-4 h-4" />
            From Past Conferences
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Moments of Manifestation
          </h2>
          <div className="h-1 w-24 bg-gradient-gold mx-auto rounded-full"></div>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Glimpses from past editions of Running with the Vision Conference —
            the same fire you will step into at RVC 2026.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3500,
            }),
          ]}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-3">
            {photos.map((photo, index) => (
              <CarouselItem key={index} className="pl-3 md:basis-1/2 lg:basis-1/3">
                <div className="group relative h-80 overflow-hidden rounded-sm border border-border shadow-lg transition-all duration-500 hover:shadow-gold">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={photo.src}
                    alt={photo.caption}
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,hsl(170,45%,7%,0.85)_100%)] opacity-80 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 inset-x-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white font-serif italic text-lg">{photo.caption}</p>
                    <div className="h-px w-10 bg-gold mt-2"></div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-ink/60 border-white/20 text-white hover:bg-ink" />
          <CarouselNext className="right-2 bg-ink/60 border-white/20 text-white hover:bg-ink" />
        </Carousel>
      </div>
    </section>
  );
};

export default EventPhotos;
