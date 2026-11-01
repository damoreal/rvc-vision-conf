import { Sparkle } from "lucide-react";

const items = [
  "RVC 2026",
  "MANIFESTATION",
  "9TH – 13TH DECEMBER 2026",
  "THE GODHOUSE CENTRE, WARRI",
  "STREAMED LIVE ON WHOLEWORD TV · YOUTUBE · FACEBOOK",
];

const Marquee = () => {
  const row = [...items, ...items];
  return (
    <div className="relative bg-gold text-gold-foreground overflow-hidden py-3 border-y border-gold-light/40">
      <div className="flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-heading font-bold text-sm tracking-[0.25em] uppercase">
              {item}
            </span>
            <Sparkle className="w-4 h-4 opacity-70" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
