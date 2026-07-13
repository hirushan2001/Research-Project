import api from '../../services/api';

export interface GuavaPredictionResponse {
  grade: 'G1' | 'G2' | 'G3' | 'G4';
  confidence: number;
  message: string;
  prediction_time: number;
}

export const predictGuava = async (imageFile: File): Promise<GuavaPredictionResponse> => {
  const formData = new FormData();
  formData.append('file', imageFile);

  const response = await api.post<GuavaPredictionResponse>('/guava/predict', formData);
  return response.data;
};
