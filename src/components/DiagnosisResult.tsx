import { CheckCircle2, AlertTriangle, Bug } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { type AnalysisResult } from "@/mapper";

interface DiagnosisResultProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const DiagnosisResult = ({ result, onReset }: DiagnosisResultProps) => {
  const isHealthy = result.isHealthy;

  // Normalize confidence (0–1 or 0–100)
  const confidencePercent =
    result.confidence <= 1
      ? Math.round(result.confidence * 100)
      : Math.round(result.confidence);

  // Confidence color logic
  const getConfidenceColor = (confidence: number) => {
    if (confidence < 30) return "red";
    if (confidence < 65) return "yellow";
    return "green";
  };

  const confidenceColor = getConfidenceColor(confidencePercent);

  return (
    <div className="w-full max-w-md mx-auto space-y-8 animate-fade-up">
      {/* Result Card */}
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl p-8 border text-center shadow-xl",
          isHealthy
            ? "bg-gradient-to-br from-green-500/15 via-emerald-500/10 to-green-400/20 border-green-500/30"
            : "bg-gradient-to-br from-red-500/15 via-orange-500/10 to-red-400/20 border-red-500/30"
        )}
      >
        {/* Icon */}
        <div className="relative flex justify-center mb-4">
          <div
            className={cn(
              "flex items-center justify-center w-16 h-16 rounded-full animate-pulse",
              isHealthy
                ? "bg-green-500/20 text-green-600"
                : "bg-red-500/20 text-red-600"
            )}
          >
            {isHealthy ? (
              <CheckCircle2 className="w-9 h-9" />
            ) : (
              <AlertTriangle className="w-9 h-9" />
            )}
          </div>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "text-2xl font-bold tracking-wide",
            isHealthy ? "text-green-700" : "text-red-700"
          )}
        >
          {isHealthy ? "Plant is Healthy 🌿" : "Disease Detected ⚠️"}
        </h3>

        {/* Subtitle */}
        <p
          className={cn(
            "mt-2 text-sm",
            isHealthy ? "text-green-600" : "text-red-600"
          )}
        >
          {isHealthy
            ? "No signs of disease were found in this leaf."
            : "The plant shows visible symptoms of disease."}
        </p>

        {/* Confidence */}
        <div className="mt-6 space-y-2">
          <div
            className={cn(
              "flex justify-between text-sm font-medium",
              confidenceColor === "green" && "text-green-700",
              confidenceColor === "yellow" && "text-yellow-700",
              confidenceColor === "red" && "text-red-700"
            )}
          >
            <span>Model Confidence</span>
            <span>{confidencePercent}%</span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700",
                confidenceColor === "green" && "bg-green-500",
                confidenceColor === "yellow" && "bg-yellow-500",
                confidenceColor === "red" && "bg-red-500"
              )}
              style={{ width: `${confidencePercent}%` }}
            />
          </div>

          {/* Low confidence warning */}
          {confidencePercent < 30 && (
            <p className="text-xs text-red-600 text-center mt-1">
              Low confidence — consider uploading a clearer image.
            </p>
          )}

          <p className="text-xs text-muted-foreground text-center mt-1">
            Based on visual patterns learned from thousands of leaf images
          </p>
        </div>

        {/* Disease Info */}
        {!isHealthy && result.disease && (
          <div className="mt-5 flex items-center justify-center gap-2 rounded-full px-4 py-2 bg-red-500/10 text-red-700 font-medium">
            <Bug className="w-5 h-5" />
            <span>{result.disease.name}</span>
          </div>
        )}
      </div>

      {/* Action */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          className={cn(
            "rounded-full px-6",
            isHealthy
              ? "border-green-500 text-green-700 hover:bg-green-500/10"
              : "border-red-500 text-red-700 hover:bg-red-500/10"
          )}
          onClick={onReset}
        >
          Analyze Another Leaf
        </Button>
      </div>
    </div>
  );
};
