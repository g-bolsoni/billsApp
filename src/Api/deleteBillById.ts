import axios from 'axios';
import { BASE_URL } from '../Constants/BaseUrlApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const deleteBillById = async (bill_id: string) => {
  const token = await AsyncStorage.getItem('@App:token');
  if (!token) {
    throw new Error('No token found');
  }

  const response = await axios.delete(`${BASE_URL}/bills/${bill_id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response;
}