import { registerUser } from "../../Api/registerUser";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const handleRegister = async (data: ICreateUser) => {
  const { name, email, password, confirmPassword } = data;

  const registerUserInfo = await registerUser(name, email, password, confirmPassword);

  return registerUserInfo;
};
