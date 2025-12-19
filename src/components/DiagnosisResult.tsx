// DiagnosisResult.tsx
import { CheckCircle2, AlertTriangle, Bug } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { type AnalysisResult } from "@/mapper";

interface DiagnosisResultProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const DiagnosisResult = ({ result, onReset }: DiagnosisResultProps) => {
  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-fade-up">
      <div
        className={cn(
          "rounded-2xl p-6 border-2 text-center",
          result.isHealthy
            ? "bg-success/10 border-success/30"
            : "bg-destructive/10 border-destructive/30"
        )}
      >
        <div className="flex justify-center mb-4">
          {result.isHealthy ? (
            <CheckCircle2 className="w-12 h-12 text-success" />
          ) : (
            <AlertTriangle className="w-12 h-12 text-destructive" />
          )}
        </div>

        <h3 className="text-2xl font-semibold">
          {result.isHealthy ? "Healthy Plant" : "Diseased Plant"}
        </h3>

        {!result.isHealthy && result.disease && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <Bug className="w-5 h-5 text-destructive" />
            <span className="text-lg font-medium">
              {result.disease.name}
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <Button variant="outline" onClick={onReset}>
          Analyze Another Leaf
        </Button>
      </div>
    </div>
  );
};
