import axios from 'axios';
import { BASE_URL } from '../Constants/BaseUrlApi';

export const fetchBillsData = async () => {
  const response = await axios.get(`${BASE_URL}/bills`);

  if(response.status != 200) return [];

  return response.data;
}