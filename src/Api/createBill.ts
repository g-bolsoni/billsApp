import axios from 'axios';
import { BASE_URL } from '../Constants/BaseUrlApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IBills } from '../Screens/Forms/props';

export const createBill = async (data: IBills) => {
  const token = await AsyncStorage.getItem('@App:token');

  if (!token) {
    throw new Error('No token found');
  }

  const response = await axios.post(`${BASE_URL}/bills`, data, {
    headers: {
      Authorization: `${token}`,
    }
  });

  return response;
}