import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Camera } from "lucide-react";
import servicePreaching from "@/assets/service-preaching.jpg.asset.json";
import ministerPreaching from "@/assets/minister-preaching.jpg.asset.json";
import worshipTeam from "@/assets/worship-team.jpg.asset.json";
import worshipperPraying from "@/assets/worshipper-praying.jpg.asset.json";
import worshipperPraying2 from "@/assets/worshipper-praying-2.jpg.asset.json";
import thanksgiving from "@/assets/thanksgiving-service.jpg.asset.json";

const photos = [
  { src: servicePreaching.url, caption: "The Word ministered with power", tall: true },
  { src: worshipTeam.url, caption: "Worship that fills the room", tall: false },
  { src: ministerPreaching.url, caption: "Apostolic impartation moments", tall: true },
  { src: worshipperPraying2.url, caption: "Hearts tuned to Heaven", tall: true },
  { src: thanksgiving.url, caption: "Thanksgiving Service with Apostle TD Philips", tall: false },
  { src: worshipperPraying.url, caption: "Deep worship, deep surrender", tall: true },
];

const EventPhotos = () => {
  return (
    <section id="moments" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-gold font-heading font-bold text-xs tracking-[0.3em] uppercase mb-4">
            <Camera className="w-4 h-4" />
            From Our Altar
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Moments of Manifestation
          </h2>
          <div className="h-1 w-24 bg-gradient-gold mx-auto rounded-full"></div>
          <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
            Glimpses of what God is doing at The Godhouse Centre — the same fire
            you will step into at RVC 2026.
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
                <div className="group relative overflow-hidden rounded-2xl border border-border shadow-lg hover:shadow-gold transition-all duration-500 h-80">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
