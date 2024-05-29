import axios from 'axios';
import { BASE_URL } from '../Constants/BaseUrlApi';

interface RegisterResponse {
  token: string;
  email: string;
}

export const registerUser = async (name: string, email: string, password: string, confirmPassword: string): Promise<RegisterResponse> => {
  const response = await axios.post(`${BASE_URL}/auth/register`, { name, email, password, confirmPassword });
  return response.data;
};
