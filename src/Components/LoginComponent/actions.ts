import { fetchAuthLogin, getUser } from "../../Api/loginUser";

export const handleLogin = async (
  email: string,
  password: string,
  signIn: Function
) => {
  try {
    const { message, Token } = await fetchAuthLogin(email, password);

    if (message !== "Auth token is valid") {
      console.error("Erro de autenticação:", message);
      return { ok: false, message: message };
    }

    // Get user name
    const userInfo = await getUser(Token);

    // Stores user data in the session and logs the user into the application
    signIn({ token: Token, email: email, name: userInfo.name });

    return { ok: true, message: message };
  } catch (error) {
    console.error("Erro ao fazer login:", error);

    return { ok: false, message: "Tente novamente mais tarde!" };
  }
};
