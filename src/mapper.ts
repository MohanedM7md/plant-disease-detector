import { type BackendResponse } from "./mockApi";

export interface AnalysisResult {
  isHealthy: boolean;
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
    disease: isHealthy ? undefined : { name: data.disease },
  };
};
