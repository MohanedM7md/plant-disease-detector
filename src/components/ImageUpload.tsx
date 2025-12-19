import { useCallback, useState } from "react";
import { Upload, X, Leaf, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onImageSelect: (files: File[]) => void;
  selectedImages: string[];
  onRemove: (index: number) => void;
  onClearAll: () => void;
  isAnalyzing: boolean;
}

export const ImageUpload = ({
  onImageSelect,
  selectedImages,
  onRemove,
  onClearAll,
  isAnalyzing,
}: ImageUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (files.length) onImageSelect(files);
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
      if (!e.target.files) return;
      const files = Array.from(e.target.files).filter((file) =>
        file.type.startsWith("image/")
      );
      if (files.length) onImageSelect(files);
    },
    [onImageSelect]
  );

  const hasImages = selectedImages.length > 0;

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
          isAnalyzing && "pointer-events-none",
          !hasImages ? "p-12" : "p-4"
        )}
      >
        {/* No images yet: big single upload box */}
        {!hasImages && (
          <label className="flex flex-col items-center justify-center gap-4 cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Leaf className="w-12 h-12 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium">Upload leaf image</p>
              <p className="text-sm text-muted-foreground">
                Drag & drop or click to browse
              </p>
            </div>
            <div className="flex gap-3 mt-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm">
                <Upload className="w-4 h-4" />
                Browse Files
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm">
                <Camera className="w-4 h-4" />
                Take Photo
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        )}

        {/* At least one image: switch to grid */}
        {hasImages && (
          <div className="grid grid-cols-3 gap-3">
            {selectedImages.map((img, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden border"
              >
                <img
                  src={img}
                  alt={`Leaf ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {!isAnalyzing && (
                  <button
                    onClick={() => onRemove(index)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}

            {/* Add Image Button */}
            <label
              className={cn(
                "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-muted cursor-pointer aspect-square hover:bg-primary/5",
                isAnalyzing && "pointer-events-none"
              )}
            >
              <div className="flex flex-col items-center justify-center">
                <Leaf className="w-8 h-8 text-primary mb-1" />
                <span className="text-xs text-muted-foreground text-center">
                  Add Image
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>
        )}

        {/* Clear All Button */}
        {selectedImages.length > 1 && !isAnalyzing && (
          <div className="flex justify-end mt-2">
            <button
              onClick={onClearAll}
              className="text-sm text-muted-foreground hover:text-destructive"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
