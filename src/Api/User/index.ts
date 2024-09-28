import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../Constants/BaseUrlApi";

import { IUpdateUser } from "../../Screens/EditProfile/props";

export const updateUser = async (data: IUpdateUser) => {
  const token = await AsyncStorage.getItem("@App:token");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.put(`${BASE_URL}/user`, data, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response;
};
