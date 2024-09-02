import axios from "axios";
import { BASE_URL } from "../Constants/BaseUrlApi";

interface LoginResponse {
  Token: string;
  message: string;
}

interface UserDataId {
  Token: string;
  userId: string;
}

export const fetchAuthLogin = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password,
  });

  return response.data;
};

export const getUserData = async ({ Token, userId }: UserDataId) => {
  const response = await axios.get(`${BASE_URL}/user/${userId}`, {
    headers: {
      Authorization: `${Token}`,
    },
  });

  return response.data;
};

export const getUser = async (Token: string) => {
  const response = await axios.get(`${BASE_URL}/user`, {
    headers: {
      Authorization: `${Token}`,
    },
  });

  return response.data;
};
