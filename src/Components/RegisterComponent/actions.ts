import { registerUser } from "../../Api/registerUser";
import { fetchAuthLogin, getUser } from "../../Api/loginUser";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const handleRegister = async (data: ICreateUser, signIn: Function) => {
  const { name, email, password, confirmPassword } = data;

  try {
    const registerUserInfo = await registerUser(
      name,
      email,
      password,
      confirmPassword
    );

    const { Token, message } = await fetchAuthLogin(email, password);

    if (message !== "Auth token is valid") {
      console.error("Erro de autenticação:", message);
      return { ok: false, message: message };
    }

    // Stores user data in the session and logs the user into the application
    signIn({ token: Token, email: email, name: name });
    return { ok: true, message: message };
  } catch (error) {
    console.error("Erro ao fazer login:", error);

    return { ok: false, message: "Tente novamente mais tarde!" };
  }
};
