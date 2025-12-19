// mockApi.ts
export interface BackendResponse {
  disease: string; // "healthy" OR disease name
  confidence: number;
}

export const mockAnalyzeLeaf = async (): Promise<BackendResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        disease: "Powdery Mildew", // change to "healthy" to test healthy case
        confidence: 92,
      });
    }, 1000);
  });
};
