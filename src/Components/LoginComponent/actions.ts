import { fetchAuthLogin, getUser } from "../../Api/loginUser";

export const handleLogin = async (
  email: string,
  password: string,
  signIn: Function
) => {

  const responseLogin = await fetchAuthLogin(email, password);

  // Get user name
  const userInfo = await getUser(responseLogin.Token);

  // Stores user data in the session and logs the user into the application
  signIn({ token: responseLogin.Token, email: email, name: userInfo.name });

  return responseLogin;
};
