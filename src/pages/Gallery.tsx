import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Upload, Download, Image as ImageIcon } from "lucide-react";
import servicePreaching from "@/assets/service-preaching.jpg.asset.json";
import ministerPreaching from "@/assets/minister-preaching.jpg.asset.json";
import worshipTeam from "@/assets/worship-team.jpg.asset.json";
import worshipperPraying from "@/assets/worshipper-praying.jpg.asset.json";
import worshipperPraying2 from "@/assets/worshipper-praying-2.jpg.asset.json";
import thanksgiving from "@/assets/thanksgiving-service.jpg.asset.json";

interface GalleryImage {
  id: number;
  url: string;
  caption: string;
  uploader: string;
  date: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([
    {
      id: 1,
      url: servicePreaching.url,
      caption: "The Word ministered with power",
      uploader: "Media Team",
      date: "2025-12-10",
    },
    {
      id: 2,
      url: worshipTeam.url,
      caption: "Worship that fills the room",
      uploader: "Media Team",
      date: "2025-12-11",
    },
    {
      id: 3,
      url: ministerPreaching.url,
      caption: "Apostolic impartation moments",
      uploader: "Conference Team",
      date: "2025-12-11",
    },
    {
      id: 4,
      url: worshipperPraying2.url,
      caption: "Hearts tuned to Heaven",
      uploader: "Media Team",
      date: "2025-12-12",
    },
    {
      id: 5,
      url: thanksgiving.url,
      caption: "Thanksgiving Service with Apostle TD Philips",
      uploader: "Media Team",
      date: "2025-12-13",
    },
    {
      id: 6,
      url: worshipperPraying.url,
      caption: "Deep worship, deep surrender",
      uploader: "Conference Team",
      date: "2025-12-12",
    },
  ]);

  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !caption.trim()) {
      toast.error("Please select an image and add a caption");
      return;
    }

    // Simulate upload
    const newImage: GalleryImage = {
      id: images.length + 1,
      url: URL.createObjectURL(selectedFile),
      caption: caption.trim(),
      uploader: "You",
      date: new Date().toISOString().split("T")[0],
    };

    setImages([newImage, ...images]);
    setCaption("");
    setSelectedFile(null);
    toast.success("Image uploaded successfully!");
  };

  const handleDownload = (_imageUrl: string, _caption: string) => {
    // In a real implementation, this would download the image
    toast.success("Download started!");
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
            RVC Moments
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">
            Image Gallery
          </h1>
          <div className="h-1 w-24 bg-gradient-gold mx-auto rounded-full"></div>
          <p className="text-white/70 mt-6 max-w-xl mx-auto">
            Relive the moments — and upload your own photos from the conference.
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Upload Section */}
            <div className="bg-card border border-border rounded-3xl p-8 md:p-10 mb-14 shadow-lg">
              <h2 className="font-serif text-2xl font-bold mb-2 flex items-center gap-2">
                <Upload className="w-6 h-6 text-gold" />
                Upload Your Photos
              </h2>
              <div className="h-1 w-16 bg-gradient-gold rounded-full mb-8"></div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="image-upload" className="block text-sm font-medium mb-2">
                    Select Image
                  </label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                </div>

                <div>
                  <label htmlFor="caption" className="block text-sm font-medium mb-2">
                    Caption
                  </label>
                  <Textarea
                    id="caption"
                    placeholder="Add a short caption for your image..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleUpload}
                  className="w-full rounded-full bg-gold text-gold-foreground hover:bg-gold/90 font-heading font-bold"
                  disabled={!selectedFile || !caption.trim()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>
            </div>

            {/* Gallery Grid */}
            <div>
              <h2 className="font-serif text-2xl font-bold mb-2 flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-gold" />
                Conference Photos
              </h2>
              <div className="h-1 w-16 bg-gradient-gold rounded-full mb-8"></div>

              {images.length === 0 ? (
                <div className="text-center py-12 bg-muted rounded-2xl">
                  <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No images yet. Be the first to upload!</p>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {images.map((image, i) => (
                    <div
                      key={image.id}
                      className={`bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-gold hover:-translate-y-1 transition-all duration-300 ${
                        i % 3 === 1 ? "lg:mt-6" : ""
                      }`}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={image.url}
                          alt={image.caption}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <p className="font-serif font-semibold text-foreground mb-2">{image.caption}</p>
                        <div className="flex justify-between items-center text-xs text-muted-foreground mb-3">
                          <span>By {image.uploader}</span>
                          <span>{new Date(image.date).toLocaleDateString()}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full rounded-full hover:bg-gold hover:text-gold-foreground hover:border-gold font-heading font-semibold"
                          onClick={() => handleDownload(image.url, image.caption)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Gallery;
