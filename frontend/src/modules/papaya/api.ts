import api from '../../services/api';

export interface PapayaPredictionResponse {
  grade: 'G1' | 'G2' | 'G3' | 'G4';
  confidence: number;
  message: string;
  prediction_time: number;
}

export const predictPapaya = async (imageFile: File): Promise<PapayaPredictionResponse> => {
  const formData = new FormData();
  formData.append('file', imageFile);

  const response = await api.post<PapayaPredictionResponse>('/papaya/predict', formData);
  return response.data;
};
