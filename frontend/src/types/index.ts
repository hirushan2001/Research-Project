export interface Prediction {
  id: string;
  grade: 'G1' | 'G2' | 'G3' | 'G4';
  confidence: number;
  message: string;
  predictionTime: number;
  date: string;
  imageUrl: string; // Base64 or Object URL for thumbnail display
}

export type FruitModuleId = 'mango' | 'guava' | 'banana' | 'papaya';

export interface FruitModule {
  id: FruitModuleId;
  name: string;
  icon: string;
  status: 'active' | 'coming-soon';
  route: string;
  description: string;
}

export interface FutureFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}
