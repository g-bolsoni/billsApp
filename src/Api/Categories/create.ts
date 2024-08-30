import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "../../Constants/BaseUrlApi";
import { ICategory } from "../../Screens/Categories/props";

export const createCategory = async (data: ICategory) => {
  const token = await AsyncStorage.getItem("@App:token");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.post(`${BASE_URL}/category`, data, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response;
};
