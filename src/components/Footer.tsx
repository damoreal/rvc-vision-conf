import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import rvcLogo from "@/assets/rvc-logo.png";
import godhouseLogo from "@/assets/godhouse-logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Branding */}
          <div className="col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={rvcLogo} alt="RVC Logo" className="h-12 w-auto" />
            </div>
            <p className="text-sm text-secondary-foreground/80 mb-4">
              Running with the Vision Conference - Bringing Heaven to Earth
            </p>
            <img src={godhouseLogo} alt="The Godhouse Centre" className="h-10 w-auto" />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/registration" className="text-sm hover:text-gold transition-colors">
                  Registration
                </Link>
              </li>
              <li>
                <a href="/#faqs" className="text-sm hover:text-gold transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <Link to="/gallery" className="text-sm hover:text-gold transition-colors">
                  Image Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>2, Indian Street, off Jakpa Road, by Mansal Hotel, Effurun-Warri, Delta State</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+234 XXX XXX XXXX</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@rvc2025.org</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary-foreground/10 hover:bg-gold hover:text-gold-foreground flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary-foreground/10 hover:bg-gold hover:text-gold-foreground flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-secondary-foreground/10 hover:bg-gold hover:text-gold-foreground flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-secondary-foreground/60">
            © {new Date().getFullYear()} Running with the Vision Conference. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
