import axios from 'axios';
import { BASE_URL } from '../Constants/BaseUrlApi';

interface LoginResponse {
  Token: string;
  message: string;
}

export const fetchAuthLogin = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });

  return response.data;
};
