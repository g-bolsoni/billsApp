import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../Constants/BaseUrlApi";

export const updateMonthlyBills = async () => {
  const token = await AsyncStorage.getItem("@App:token");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.post(
    `${BASE_URL}/updateMonthlyBills`,
    {},
    {
      headers: {
        Authorization: `${token}`,
      },
    }
  );

  if (response.status != 200) return [];

  return response.data;
};

export const monthlyExpenses = async () => {
  const token = await AsyncStorage.getItem("@App:token");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.get(`${BASE_URL}/monthlyExpenses`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  if (response.status != 200) return [];

  return response.data.data;
};
