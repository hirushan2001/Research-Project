import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export interface HealthResponse {
  status: string;
  app: string;
  version: string;
  active_modules: string[];
  mock_mode: boolean;
}

export const checkHealth = async (): Promise<HealthResponse> => {
  const rootUrl = API_BASE_URL.replace(/\/api\/?$/, '');
  const response = await axios.get<HealthResponse>(rootUrl || 'http://localhost:8000');
  return response.data;
};

export default api;
