import { useState, useCallback } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import { DiagnosisResult, type AnalysisResult } from "@/components/DiagnosisResult";
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

// Mock analysis function
const mockAnalyzeImage = (): Promise<AnalysisResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isHealthy = Math.random() > 0.5;

      if (isHealthy) {
        resolve({
          isHealthy: true,
          confidence: Math.floor(Math.random() * 10) + 90,
        });
      } else {
        const diseases = [
          {
            name: "Powdery Mildew",
            description:
              "A fungal disease that appears as white or gray powdery spots on leaves and stems.",
            severity: "medium" as const,
            causes: [
              "High humidity",
              "Poor air circulation",
              "Overcrowding of plants",
            ],
            treatments: [
              "Remove infected leaves",
              "Apply neem oil or fungicide",
              "Improve air circulation",
            ],
          },
          {
            name: "Bacterial Leaf Spot",
            description:
              "Dark water-soaked spots with yellow halos caused by bacteria.",
            severity: "high" as const,
            causes: [
              "Overhead watering",
              "Contaminated tools",
              "Wet conditions",
            ],
            treatments: [
              "Remove infected leaves",
              "Apply copper-based bactericide",
              "Sanitize tools",
            ],
          },
          {
            name: "Leaf Rust",
            description:
              "Orange or rust-colored pustules on the underside of leaves.",
            severity: "low" as const,
            causes: [
              "Cool moist weather",
              "Extended leaf wetness",
              "Nearby infected plants",
            ],
            treatments: [
              "Apply sulfur fungicide",
              "Remove infected leaves",
              "Avoid wetting foliage",
            ],
          },
        ];

        resolve({
          isHealthy: false,
          confidence: Math.floor(Math.random() * 15) + 85,
          disease: diseases[Math.floor(Math.random() * diseases.length)],
        });
      }
    }, 3000);
  });
};

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [plantType, setPlantType] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleImageSelect = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleClear = useCallback(() => {
    setSelectedImage(null);
    setPlantType(null);
    setResult(null);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!selectedImage || !plantType) return;

    setIsAnalyzing(true);
    try {
      const analysisResult = await mockAnalyzeImage();
      setResult(analysisResult);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [selectedImage, plantType]);

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
              Upload a leaf image and select the plant type for accurate AI diagnosis.
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

            <ImageUpload
              onImageSelect={handleImageSelect}
              selectedImage={selectedImage}
              onClear={handleClear}
              isAnalyzing={isAnalyzing}
            />

            {selectedImage && plantType && !isAnalyzing && (
              <div className="flex justify-center animate-fade-up">
                <Button onClick={handleAnalyze}>
                  <Sparkles className="w-5 h-5" />
                  Analyze {plantType} Leaf
                </Button>
              </div>
            )}
          </div>
        ) : (
          <DiagnosisResult result={result} onReset={handleClear} />
        )}
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6 text-center text-sm text-muted-foreground">
        LeafMD is for educational purposes only. Consult professionals for serious issues.
      </footer>
    </div>
  );
};

export default Index;
