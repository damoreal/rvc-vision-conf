import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink">
      <div className="text-center px-4">
        <h1 className="font-display text-8xl text-gold text-glow-gold mb-6">404</h1>
        <p className="font-serif text-2xl text-white mb-2">Oops! Page not found</p>
        <p className="text-white/60 mb-8">
          The page you're looking for wandered off the race track.
        </p>
        <Button
          asChild
          className="rounded-full bg-gold text-gold-foreground hover:bg-gold/90 font-heading font-bold px-8"
        >
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
