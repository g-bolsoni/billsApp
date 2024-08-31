import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "../../Constants/BaseUrlApi";

export const fetchCategoriesData = async () => {
  const token = await AsyncStorage.getItem("@App:token");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.get(`${BASE_URL}/category`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response.data;
};
