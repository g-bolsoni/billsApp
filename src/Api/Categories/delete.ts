import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "../../Constants/BaseUrlApi";

export const deleteCategoryById = async (category_id: String) => {
  const token = await AsyncStorage.getItem("@App:token");

  if (!token) {
    console.error("No token found");
    throw new Error("No token found");
  }

  const response = await axios.delete(`${BASE_URL}/category/${category_id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response;
};
