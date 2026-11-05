import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Upload, Download, Share2, Wand2, ShieldCheck } from "lucide-react";
import rvcLogo from "@/assets/rvc-logo.png";
import godhouseLogo from "@/assets/godhouse-logo.png";

const W = 1080;
const H = 1350;

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });

const drawCover = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) => {
  const scale = Math.max(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
};

const roundRectPath = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
};

const Invite = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoRef = useRef<HTMLImageElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const logosRef = useRef<{ rvc?: HTMLImageElement; godhouse?: HTMLImageElement }>({});
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [, forceDraw] = useState(0);

  /* Preload the two logos once */
  useEffect(() => {
    Promise.all([loadImage(rvcLogo), loadImage(godhouseLogo)])
      .then(([rvc, godhouse]) => {
        logosRef.current = { rvc, godhouse };
        forceDraw((t) => t + 1);
      })
      .catch(() => undefined);
  }, []);

  /* Redraw once web fonts are available */
  useEffect(() => {
    document.fonts.ready.then(() => forceDraw((t) => t + 1)).catch(() => undefined);
  }, []);

  const drawInvite = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ---- Background: deep teal night with a gold bloom ---- */
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#0d3129");
    bg.addColorStop(0.55, "#062018");
    bg.addColorStop(1, "#03130f");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const bloom = ctx.createRadialGradient(W * 0.85, H * 0.08, 0, W * 0.85, H * 0.08, W * 0.75);
    bloom.addColorStop(0, "rgba(233,180,76,0.16)");
    bloom.addColorStop(1, "rgba(233,180,76,0)");
    ctx.fillStyle = bloom;
    ctx.fillRect(0, 0, W, H);

    /* Fine gold ornament lines */
    ctx.strokeStyle = "rgba(233,180,76,0.25)";
    ctx.lineWidth = 2;
    [70, W - 70].forEach((x) => {
      ctx.beginPath();
      ctx.moveTo(x, 170);
      ctx.lineTo(x, H - 70);
      ctx.stroke();
    });

    /* ---- Logos ---- */
    const { rvc, godhouse } = logosRef.current;
    const logoH = 92;
    if (rvc) {
      const lw = (logoH * rvc.width) / rvc.height;
      ctx.drawImage(rvc, 60, 58, lw, logoH);
    }
    if (godhouse) {
      const lw = (logoH * godhouse.width) / godhouse.height;
      ctx.drawImage(godhouse, W - 60 - lw, 58, lw, logoH);
    }

    /* ---- Header title ---- */
    ctx.textAlign = "center";
    ctx.fillStyle = "#f5d78e";
    ctx.font = '700 27px Montserrat, sans-serif';
    try { ctx.letterSpacing = "7px"; } catch { /* older canvas */ }
    ctx.fillText("RUNNING WITH THE VISION CONFERENCE", W / 2, 208);
    try { ctx.letterSpacing = "0px"; } catch { /* noop */ }

    /* ---- Photo window ---- */
    const px = 96;
    const py = 258;
    const pw = W - px * 2;
    const ph = 520;
    ctx.save();
    roundRectPath(ctx, px, py, pw, ph, 22);
    ctx.clip();
    const photo = photoRef.current;
    if (photo) {
      drawCover(ctx, photo, px, py, pw, ph);
      const fade = ctx.createLinearGradient(0, py + ph * 0.55, 0, py + ph);
      fade.addColorStop(0, "rgba(3,19,15,0)");
      fade.addColorStop(1, "rgba(3,19,15,0.65)");
      ctx.fillStyle = fade;
      ctx.fillRect(px, py, pw, ph);
    } else {
      ctx.fillStyle = "rgba(233,180,76,0.06)";
      ctx.fillRect(px, py, pw, ph);
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.font = '600 34px Inter, sans-serif';
      ctx.fillText("YOUR PHOTO GOES HERE", W / 2, py + ph / 2);
    }
    ctx.restore();

    /* Gold frame around the photo window */
    ctx.strokeStyle = "rgba(233,180,76,0.85)";
    ctx.lineWidth = 5;
    roundRectPath(ctx, px - 6, py - 6, pw + 12, ph + 12, 26);
    ctx.stroke();

    /* ---- Headline ---- */
    ctx.fillStyle = "rgba(255,255,255,0.88)";
    ctx.font = '600 40px Inter, sans-serif';
    try { ctx.letterSpacing = "18px"; } catch { /* noop */ }
    ctx.fillText("I AM", W / 2, 868);
    try { ctx.letterSpacing = "0px"; } catch { /* noop */ }

    ctx.shadowColor = "rgba(233,180,76,0.55)";
    ctx.shadowBlur = 36;
    ctx.fillStyle = "#e9b44c";
    ctx.font = '150px Anton, sans-serif';
    ctx.fillText("RVC-BOUND", W / 2, 1006);
    ctx.shadowBlur = 0;

    if (name.trim()) {
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.font = 'italic 700 40px "Playfair Display", serif';
      ctx.fillText(name.trim(), W / 2, 1064);
    }

    /* Gold divider */
    ctx.fillStyle = "#e9b44c";
    ctx.fillRect(W / 2 - 120, name.trim() ? 1098 : 1064, 240, 4);

    /* ---- Theme, date, venue ---- */
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = '800 32px Montserrat, sans-serif';
    try { ctx.letterSpacing = "10px"; } catch { /* noop */ }
    ctx.fillText("THEME · MANIFESTATION", W / 2, 1158);
    try { ctx.letterSpacing = "0px"; } catch { /* noop */ }

    ctx.fillStyle = "#f5d78e";
    ctx.font = '800 38px Inter, sans-serif';
    ctx.fillText("9TH – 13TH DEC, 2026  |  9AM & 4PM WAT", W / 2, 1216);

    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = '500 30px Inter, sans-serif';
    ctx.fillText("The Godhouse Centre, Warri", W / 2, 1262);

    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = '500 24px Inter, sans-serif';
    ctx.fillText("Streamed live on Wholeword TV · YouTube · Facebook", W / 2, 1310);
  }, [name]);

  /* Redraw whenever the photo, name or fonts change */
  useEffect(() => {
    drawInvite();
  }, [drawInvite, photoUrl, hasPhoto]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    try {
      const img = await loadImage(url);
      photoRef.current = img;
      setPhotoUrl(url);
      setHasPhoto(true);
      toast.success("Photo added — your invite is ready!");
    } catch {
      toast.error("That image could not be loaded");
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) {
        toast.error("Could not create the invite image");
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "RVC-2026-invite.png";
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Invite downloaded — share it anywhere!");
    }, "image/png");
  };

  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(async (blob) => {
      if (!blob) {
        toast.error("Could not create the invite image");
        return;
      }
      const file = new File([blob], "RVC-2026-invite.png", { type: "image/png" });
      const shareData = {
        title: "RVC 2026 — Manifestation",
        text: "I am RVC-bound! Join me at Running with the Vision Conference 2026, 9–13 December, Warri.",
        files: [file],
      };
      if (navigator.canShare?.(shareData) && navigator.share) {
        try {
          await navigator.share(shareData);
        } catch {
          /* user dismissed the share sheet */
        }
      } else {
        toast.info("Direct sharing isn't supported on this device — download the image and share it.");
      }
    }, "image/png");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Dark intro banner */}
      <div className="relative bg-ink overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl breathe-gold"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gold/10 rounded-full blur-3xl breathe-gold"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <p className="text-gold font-heading font-bold text-xs tracking-[0.3em] uppercase mb-4">
            RVC 2026
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Create Your Invite
          </h1>
          <div className="h-1 w-24 bg-gradient-gold mx-auto rounded-full"></div>
          <p className="text-white/70 mt-6 max-w-xl mx-auto">
            Upload your photo and we'll turn it into a beautiful "I am RVC-bound"
            invite you can download and share with friends.
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
            {/* Controls */}
            <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-lg">
              <h2 className="font-serif text-2xl font-bold mb-2 flex items-center gap-2">
                <Wand2 className="w-6 h-6 text-gold" />
                Design Your Invite
              </h2>
              <div className="h-1 w-16 bg-gradient-gold rounded-full mb-8"></div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="invite-photo" className="block text-sm font-medium mb-2">
                    Your Photo
                  </label>
                  <Input
                    id="invite-photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                    Your photo never leaves your device — the invite is built right in your browser.
                  </p>
                </div>

                <div>
                  <label htmlFor="invite-name" className="block text-sm font-medium mb-2">
                    Your Name <span className="text-muted-foreground font-normal">(optional)</span>
                  </label>
                  <Input
                    id="invite-name"
                    type="text"
                    placeholder="e.g. Tolu Adeyemi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={40}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    onClick={handleDownload}
                    disabled={!hasPhoto}
                    className="flex-1 rounded-full bg-gold text-gold-foreground hover:bg-gold-light font-heading font-bold"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Invite
                  </Button>
                  <Button
                    onClick={handleShare}
                    disabled={!hasPhoto}
                    variant="outline"
                    className="flex-1 rounded-full hover:bg-gold hover:text-gold-foreground hover:border-gold font-heading font-semibold"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>

                {!hasPhoto && (
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Upload className="w-4 h-4 text-gold" />
                    Add your photo above to unlock download &amp; share.
                  </p>
                )}
              </div>

              <div className="mt-10 pt-8 border-t border-border">
                <h3 className="font-heading font-bold text-sm uppercase tracking-[0.2em] text-gold mb-3">
                  What's on the invite
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Your photo in a gold frame</li>
                  <li>• "I am RVC-bound" headline</li>
                  <li>• Theme: Manifestation</li>
                  <li>• 9th – 13th December, 2026 · 9am &amp; 4pm WAT</li>
                  <li>• The Godhouse Centre, Warri</li>
                </ul>
              </div>
            </div>

            {/* Live preview */}
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-heading font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Live Preview
              </p>
              <div className="rounded-3xl border border-gold/30 shadow-gold p-2 bg-ink">
                <canvas
                  ref={canvasRef}
                  width={W}
                  height={H}
                  className="w-full h-auto rounded-2xl"
                  aria-label="Preview of your RVC invite"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Invite;
