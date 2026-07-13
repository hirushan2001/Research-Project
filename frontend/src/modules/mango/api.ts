import api from '../../services/api';

export interface MangoPredictionResponse {
  grade: 'G1' | 'G2' | 'G3' | 'G4';
  confidence: number;
  message: string;
  prediction_time: number;
}

export const predictMango = async (imageFile: File): Promise<MangoPredictionResponse> => {
  const formData = new FormData();
  formData.append('file', imageFile);

  const response = await api.post<MangoPredictionResponse>('/mango/predict', formData);
  return response.data;
};
