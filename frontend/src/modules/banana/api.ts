import api from '../../services/api';

export interface BananaPredictionResponse {
  grade: 'G1' | 'G2' | 'G3' | 'G4';
  confidence: number;
  message: string;
  prediction_time: number;
}

export const predictBanana = async (imageFile: File): Promise<BananaPredictionResponse> => {
  const formData = new FormData();
  formData.append('file', imageFile);

  const response = await api.post<BananaPredictionResponse>('/banana/predict', formData);
  return response.data;
};
