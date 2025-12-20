import { useState, useCallback } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { DiagnosisResult } from "@/components/DiagnosisResult";
import { Button } from "@/components/ui/button";
import { Sparkles, Shield, Zap } from "lucide-react";
import heroLeaf from "@/assets/hero-leaf.jpg";
import { mapBackendResponse, type AnalysisResult } from "@/mapper";
import { uploadImage } from "@/services/imageServices";
import { AnalysisLoading } from "@/components/AnalysisLoading";
import PlantSelector from "@/components/PlantSelector";

const Index = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [plantType, setPlantType] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleImageSelect = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles]);
    setPreviews((prev) => [
      ...prev,
      ...newFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  // Remove a single image
  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear all images
  const clearAll = () => {
    setFiles([]);
    setPreviews([]);
    setResult(null);
  };

const handleAnalyze = useCallback(async () => {
  if (!files.length || !plantType) return;

  setIsAnalyzing(true);

  try {
    const formData = new FormData();

    formData.append("plant_type", plantType);

    files.forEach((file) => {
      formData.append("images", file);
    });

    const backendResponse = await uploadImage(formData);
    const mappedResult = mapBackendResponse(backendResponse);
    setResult(mappedResult);
  } catch (error) {
    console.error("Analysis failed:", error);
  } finally {
    setIsAnalyzing(false);
  }
}, [files, plantType]);


  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroLeaf})` }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/50 via-background/80 to-background" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xl font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>LeafMD</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Diagnose Your Plant's Health in Seconds
            </h1>

            <p className="text-lg text-muted-foreground">
              Upload a leaf image and select the plant type for accurate
              diagnosis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Zap, title: "Instant Analysis", desc: "Results in seconds" },
              { icon: Shield, title: "Accurate Detection", desc: "90%+ accuracy" },
            ].map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
{isAnalyzing ? (
  <AnalysisLoading plantType={plantType!} />
) : result ? (
  <DiagnosisResult result={result} onReset={clearAll} />
) : (
  <div className="space-y-6">
    <PlantSelector
      selectedPlant={plantType}
      onSelect={setPlantType}
    />

    <ImageUpload
      onImageSelect={handleImageSelect}
      selectedImages={previews}
      onRemove={removeImage}
      onClearAll={clearAll}
      isAnalyzing={isAnalyzing}
    />

    {previews.length > 0 && plantType && (
      <div className="flex justify-center animate-fade-up">
        <Button onClick={handleAnalyze}>
          <Sparkles className="w-5 h-5" />
          Analyze {plantType} Leaf
        </Button>
      </div>
    )}
  </div>
)}

      </section>

      <footer className="border-t py-8 px-6 text-center text-sm text-muted-foreground">
        LeafMD is for educational purposes only. Consult professionals for serious
        issues.
      </footer>
    </div>
  );
};

export default Index;
