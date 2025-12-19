import { useCallback, useState } from "react";
import { Upload, X, Leaf, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: string | null;
  onClear: () => void;
  isAnalyzing: boolean;
}

export const ImageUpload = ({
  onImageSelect,
  selectedImage,
  onClear,
  isAnalyzing,
}: ImageUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onImageSelect(file);
      }
    },
    [onImageSelect]
  );

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden",
          isDragOver
            ? "border-accent bg-accent/10 scale-[1.02]"
            : "border-border bg-card hover:border-primary/50",
          selectedImage ? "p-0" : "p-12",
          isAnalyzing && "pointer-events-none"
        )}
      >
        {selectedImage ? (
          <div className="relative aspect-square">
            <img
              src={selectedImage}
              alt="Selected plant leaf"
              className="w-full h-full object-cover"
            />
            
            {/* Scanning overlay */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm">
                <div className="absolute inset-x-0 h-1 bg-accent animate-scan" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full border-4 border-accent border-t-transparent animate-spin" />
                    <span className="text-primary-foreground font-medium text-lg bg-foreground/50 px-4 py-2 rounded-full backdrop-blur-sm">
                      Analyzing leaf...
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Clear button */}
            {!isAnalyzing && (
              <button
                onClick={onClear}
                className="absolute top-4 right-4 p-2 rounded-full bg-foreground/80 text-background hover:bg-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center cursor-pointer gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse-ring">
                <Leaf className="w-10 h-10 text-primary" />
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-lg font-medium text-foreground mb-1">
                Upload a leaf image
              </p>
              <p className="text-sm text-muted-foreground">
                Drag & drop or click to browse
              </p>
            </div>

            <div className="flex gap-3 mt-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm">
                <Upload className="w-4 h-4" />
                <span>Browse Files</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm">
                <Camera className="w-4 h-4" />
                <span>Take Photo</span>
              </div>
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
};
