import { type BackendResponse } from "./mockApi";

export interface AnalysisResult {
  isHealthy: boolean;
  confidence: number;
  disease?: {
    name: string;
  };
}

export const mapBackendResponse = (
  data: BackendResponse
): AnalysisResult => {
  const isHealthy = data.disease.toLowerCase() === "healthy";

  return {
    isHealthy,
    confidence: data.confidence, // keep raw
    disease: isHealthy ? undefined : { name: data.disease },
  };
};
