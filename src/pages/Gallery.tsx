import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Upload, Download, Image as ImageIcon } from "lucide-react";

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
      url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
      caption: "Opening worship session - Day 1",
      uploader: "Conference Team",
      date: "2024-12-10",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      caption: "Powerful ministration by the choir",
      uploader: "Media Team",
      date: "2024-12-11",
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

  const handleDownload = (imageUrl: string, caption: string) => {
    // In a real implementation, this would download the image
    toast.success("Download started!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
              Image Gallery
            </h1>
            <div className="h-1 w-24 bg-gradient-hero mx-auto mb-12 rounded-full"></div>

            {/* Upload Section */}
            <div className="bg-card border border-border rounded-2xl p-8 mb-12 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Upload className="w-6 h-6 text-primary" />
                Upload Your Photos
              </h2>
              
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
                  className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90"
                  disabled={!selectedFile || !caption.trim()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
              </div>
            </div>

            {/* Gallery Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-primary" />
                Conference Photos
              </h2>

              {images.length === 0 ? (
                <div className="text-center py-12 bg-muted rounded-xl">
                  <ImageIcon className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No images yet. Be the first to upload!</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {images.map((image) => (
                    <div
                      key={image.id}
                      className="bg-card border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={image.url}
                          alt={image.caption}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <p className="font-medium text-foreground mb-2">{image.caption}</p>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <span>By {image.uploader}</span>
                          <span>{new Date(image.date).toLocaleDateString()}</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-3"
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
