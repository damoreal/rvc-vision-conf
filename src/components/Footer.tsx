import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import rvcLogo from "@/assets/rvc-logo.png";
import godhouseLogo from "@/assets/godhouse-logo.png";

const Footer = () => {
  return (
    <footer className="bg-ink text-white relative overflow-hidden">
      {/* top gold hairline */}
      <div className="h-1 bg-gradient-gold"></div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Branding */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={rvcLogo} alt="RVC Logo" className="h-12 w-auto drop-shadow" />
              <div>
                <div className="font-heading font-bold text-lg">
                  RVC <span className="text-gold">'26</span>
                </div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                  Manifestation
                </div>
              </div>
            </div>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              Running with the Vision Conference — an annual believers'
              conference of The Godhouse Missions International.
            </p>
            <img src={godhouseLogo} alt="The Godhouse Centre" className="h-10 w-auto" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-[0.2em] text-gold mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-white/80 hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/registration" className="text-sm text-white/80 hover:text-gold transition-colors">
                  Registration
                </Link>
              </li>
              <li>
                <a href="/#faqs" className="text-sm text-white/80 hover:text-gold transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <Link to="/invite" className="text-sm text-white/80 hover:text-gold transition-colors">
                  Create Your Invite
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-[0.2em] text-gold mb-5">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/80">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" />
                <span>
                  2, Indian Street, off Jakpa Road, by Mansal Hotel,
                  Effurun-Warri, Delta State
                </span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Phone className="w-4 h-4 flex-shrink-0 text-gold" />
                <span>+234 XXX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/80">
                <Mail className="w-4 h-4 flex-shrink-0 text-gold" />
                <span>info@thegodhouse.org</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-[0.2em] text-gold mb-5">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/theGodHouseCentre/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold hover:text-gold-foreground flex items-center justify-center transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold hover:text-gold-foreground flex items-center justify-center transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold hover:text-gold-foreground flex items-center justify-center transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-white/60 mt-6 leading-relaxed">
              Sessions streamed live on Wholeword TV, YouTube &amp; Facebook.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Running with the Vision Conference ·
            Organized by The Godhouse Missions International. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
