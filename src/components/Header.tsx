import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import rvcLogo from "@/assets/rvc-logo.png";
import godhouseLogo from "@/assets/godhouse-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToFAQs = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const faqSection = document.getElementById("faqs");
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#faqs";
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Registration", path: "/registration" },
    { name: "FAQs", path: "/#faqs", onClick: scrollToFAQs },
    { name: "Create Invite", path: "/invite" },
  ];

  const isActive = (path: string) => {
    if (path.includes("#")) return false;
    return location.pathname === path;
  };

  const transparentMode = isHome && !scrolled && !isMenuOpen;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        transparentMode
          ? "bg-transparent"
          : "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
      }`}
    >
      <nav className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={rvcLogo}
              alt="RVC Logo"
              className="h-11 md:h-12 w-auto drop-shadow-md"
            />
            <div className="hidden sm:block">
              <div
                className={`font-heading font-bold text-lg tracking-wide transition-colors ${
                  transparentMode ? "text-white" : "text-foreground"
                }`}
              >
                RVC <span className="text-gold">'26</span>
              </div>
              <div
                className={`text-[11px] tracking-[0.18em] uppercase transition-colors ${
                  transparentMode ? "text-white/70" : "text-muted-foreground"
                }`}
              >
                Running with the Vision
              </div>
            </div>
          </Link>

          {/* Desktop Godhouse logo — centered */}
          <div className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            <img
              src={godhouseLogo}
              alt="The Godhouse Centre"
              className={`h-10 w-auto transition-opacity ${
                transparentMode ? "opacity-70 hover:opacity-100" : "opacity-60 hover:opacity-100"
              } transition-opacity`}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={item.onClick}
                className={`text-sm font-medium transition-colors hover:text-gold ${
                  isActive(item.path)
                    ? "text-gold"
                    : transparentMode
                    ? "text-white/90"
                    : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button
              asChild
              size="sm"
              className="rounded-full bg-gold text-gold-foreground hover:bg-gold/90 font-heading font-bold shadow-gold"
            >
              <Link to="/registration">Register</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors ${
              transparentMode ? "text-white" : "text-foreground"
            }`}
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
                    if (item.onClick) item.onClick(e as React.MouseEvent<HTMLAnchorElement>);
                  }}
                  className={`text-sm font-medium transition-colors hover:text-gold ${
                    isActive(item.path) ? "text-gold" : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                asChild
                size="sm"
                className="w-full rounded-full bg-gold text-gold-foreground hover:bg-gold/90 font-heading font-bold"
              >
                <Link to="/registration" onClick={() => setIsMenuOpen(false)}>
                  Register
                </Link>
              </Button>
              <div className="flex justify-center pt-2">
                <img src={godhouseLogo} alt="The Godhouse Centre" className="h-8 w-auto opacity-80" />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
