import { useState, useCallback } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { DiagnosisResult } from "@/components/DiagnosisResult";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, Shield, Zap } from "lucide-react";
import heroLeaf from "@/assets/hero-leaf.jpg";
import { mapBackendResponse, type AnalysisResult } from "@/mapper";
import { mockAnalyzeLeaf } from "@/mockApi";

const Index = () => {
  // State for multiple images
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [plantType, setPlantType] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // Handle new images
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

  // Analyze images
  const handleAnalyze = useCallback(async () => {
    if (!previews.length || !plantType) return;

    setIsAnalyzing(true);
    try {
      const backendResponse = await mockAnalyzeLeaf();
      const mappedResult = mapBackendResponse(backendResponse);
      setResult(mappedResult);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [previews, plantType]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroLeaf})` }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/50 via-background/80 to-background" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Plant Diagnostics</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
              Diagnose Your Plant's Health in Seconds
            </h1>

            <p className="text-lg text-muted-foreground">
              Upload a leaf image and select the plant type for accurate AI
              diagnosis.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Zap, title: "Instant Analysis", desc: "Results in seconds" },
              { icon: Shield, title: "Accurate Detection", desc: "90%+ accuracy" },
              { icon: Sparkles, title: "Treatment Tips", desc: "Expert guidance" },
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

      {/* Upload Section */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        {!result ? (
          <div className="space-y-6">
            {/* Plant Type Dropdown */}
            <div className="max-w-sm mx-auto">
              <Select value={plantType ?? ""} onValueChange={setPlantType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select plant type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="strawberry">Strawberry</SelectItem>
                  <SelectItem value="potato">Potato</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Image Upload */}
            <ImageUpload
              onImageSelect={handleImageSelect}
              selectedImages={previews}
              onRemove={removeImage}
              onClearAll={clearAll}
              isAnalyzing={isAnalyzing}
            />

            {previews.length > 0 && plantType && !isAnalyzing && (
              <div className="flex justify-center animate-fade-up">
                <Button onClick={handleAnalyze}>
                  <Sparkles className="w-5 h-5" />
                  Analyze {plantType} Leaf
                </Button>
              </div>
            )}
          </div>
        ) : (
          <DiagnosisResult result={result} onReset={clearAll} />
        )}
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6 text-center text-sm text-muted-foreground">
        LeafMD is for educational purposes only. Consult professionals for serious
        issues.
      </footer>
    </div>
  );
};

export default Index;
