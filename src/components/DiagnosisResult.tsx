import { CheckCircle2, AlertTriangle, Info, Leaf, Bug, Droplets, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export interface AnalysisResult {
  isHealthy: boolean;
  confidence: number;
  disease?: {
    name: string;
    description: string;
    severity: "low" | "medium" | "high";
    causes: string[];
    treatments: string[];
  };
}

interface DiagnosisResultProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const DiagnosisResult = ({ result, onReset }: DiagnosisResultProps) => {
  const severityColors = {
    low: "text-warning bg-warning/10 border-warning/30",
    medium: "text-destructive/80 bg-destructive/10 border-destructive/30",
    high: "text-destructive bg-destructive/10 border-destructive/30",
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 animate-fade-up">
      {/* Status Card */}
      <div
        className={cn(
          "rounded-2xl p-6 border-2 transition-all",
          result.isHealthy
            ? "bg-success/5 border-success/30 glow-success"
            : "bg-warning/5 border-warning/30 glow-warning"
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              result.isHealthy ? "bg-success/20" : "bg-warning/20"
            )}
          >
            {result.isHealthy ? (
              <CheckCircle2 className="w-8 h-8 text-success" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-warning" />
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="text-2xl font-serif font-semibold text-foreground">
              {result.isHealthy ? "Healthy Plant" : "Infection Detected"}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden max-w-32">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-1000",
                    result.isHealthy ? "bg-success" : "bg-warning"
                  )}
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground">
                {result.confidence}% confidence
              </span>
            </div>
          </div>
        </div>

        {result.isHealthy && (
          <p className="mt-4 text-muted-foreground">
            Your plant leaf appears to be in excellent condition with no signs of disease or stress.
            Keep up the good care! 🌿
          </p>
        )}
      </div>

      {/* Disease Details */}
      {!result.isHealthy && result.disease && (
        <>
          {/* Disease Info */}
          <div className="rounded-2xl bg-card border border-border p-6 shadow-soft">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
                <Bug className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="text-xl font-serif font-semibold text-foreground">
                    {result.disease.name}
                  </h4>
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium border capitalize",
                      severityColors[result.disease.severity]
                    )}
                  >
                    {result.disease.severity} severity
                  </span>
                </div>
                <p className="text-muted-foreground mt-2">
                  {result.disease.description}
                </p>
              </div>
            </div>
          </div>

          {/* Causes */}
          <div className="rounded-2xl bg-card border border-border p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Info className="w-5 h-5 text-secondary-foreground" />
              </div>
              <h4 className="text-lg font-semibold text-foreground">Possible Causes</h4>
            </div>
            <ul className="space-y-2">
              {result.disease.causes.map((cause, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div className="rounded-2xl bg-card border border-border p-6 shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-success" />
              </div>
              <h4 className="text-lg font-semibold text-foreground">Recommended Treatments</h4>
            </div>
            <ul className="space-y-3">
              {result.disease.treatments.map((treatment, index) => (
                <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-success/5 border border-success/20">
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground">{treatment}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {/* Tips for Healthy */}
      {result.isHealthy && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Droplets, title: "Water", tip: "Keep soil consistently moist" },
            { icon: Sun, title: "Light", tip: "Ensure adequate sunlight" },
            { icon: Leaf, title: "Nutrients", tip: "Feed monthly during growth" },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-xl bg-card border border-border p-4 text-center shadow-soft hover:shadow-elevated transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <h5 className="font-semibold text-foreground mb-1">{item.title}</h5>
              <p className="text-sm text-muted-foreground">{item.tip}</p>
            </div>
          ))}
        </div>
      )}

      {/* Action Button */}
      <div className="flex justify-center pt-4">
        <Button variant="outline" size="lg" onClick={onReset}>
          Analyze Another Leaf
        </Button>
      </div>
    </div>
  );
};
