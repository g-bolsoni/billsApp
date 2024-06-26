import axios from 'axios';
import { BASE_URL } from '../Constants/BaseUrlApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchBillsData = async () => {
  const token = await AsyncStorage.getItem('@App:token');
  if (!token) {
    throw new Error('No token found');
  }

  const response = await axios.get(`${BASE_URL}/bills`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  if (response.status != 200) return [];

  return response.data;
}