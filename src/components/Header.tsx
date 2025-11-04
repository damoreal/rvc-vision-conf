import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import rvcLogo from "@/assets/rvc-logo.png";
import godhouseLogo from "@/assets/godhouse-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const scrollToFAQs = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const faqSection = document.getElementById('faqs');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Registration", path: "/registration" },
    { name: "FAQs", path: "/#faqs", onClick: scrollToFAQs },
    { name: "Image Gallery", path: "/gallery" },
  ];

  const isActive = (path: string) => {
    if (path.includes("#")) {
      return false;
    }
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={rvcLogo} alt="RVC Logo" className="h-12 w-auto" />
            <div className="hidden sm:block">
              <div className="font-bold text-xl text-primary">RVC 2025</div>
              <div className="text-xs text-muted-foreground">Running with the Vision</div>
            </div>
          </Link>

          {/* Desktop Godhouse Logo */}
          <div className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            <img src={godhouseLogo} alt="The Godhouse Centre" className="h-10 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={item.onClick}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(item.path) ? "text-primary" : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild variant="default" size="sm">
              <Link to="/registration">Register Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    if (item.onClick) item.onClick(e);
                  }}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive(item.path) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild variant="default" size="sm" className="w-full">
                <Link to="/registration" onClick={() => setIsMenuOpen(false)}>
                  Register Now
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
