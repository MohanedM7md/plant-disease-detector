import { Loader2, Sparkles } from "lucide-react";

interface AnalysisLoadingProps {
  plantType: string;
}

export const AnalysisLoading = ({ plantType }: AnalysisLoadingProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-16 animate-fade-up">
      {/* Spinner */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse" />
        <Loader2 className="relative w-16 h-16 text-primary animate-spin" />
      </div>

      {/* Text */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">
          Analyzing {plantType} Leaf
        </h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Our AI is examining patterns, color, and texture to detect diseases.
        </p>
      </div>
    </div>
  );
};
