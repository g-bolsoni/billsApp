import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../Constants/BaseUrlApi";

import { IUpdateUser } from "../../Screens/EditProfile/props";
import { IForgotPassword } from "../../Screens/ForgotPassword/props";
import { IResetPasswordConfirm } from "../../Screens/ResetPasswordConfirmation/props";

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

export const deleteUser = async () => {
  const token = await AsyncStorage.getItem("@App:token");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.delete(`${BASE_URL}/user`, {
    headers: {
      Authorization: `${token}`,
    },
  });

  return response;
};

export const resetPasswordApi = async (data: IForgotPassword) => {
  const response = await axios.post(`${BASE_URL}/resetPassword`, data, {});
  return response;
};
export const resetPasswordConfirm = async (data: IResetPasswordConfirm) => {
  const response = await axios.post(`${BASE_URL}/resetPasswordConfirm`, data,  {});

  return response;
};
