import { fetchAuthLogin, getUserData } from "../../Api/loginUser";

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
    const userTokenData = JSON.parse(atob(Token.split(".")[1]));
    const userId = userTokenData.id;
    const userInfo = await getUserData({ Token, userId });

    // Armazenar o token e logar o usuário
    signIn({ token: Token, email: email, name: userInfo?.name });

    return { ok: true, message: message };
  } catch (error) {
    console.error("Erro ao fazer login:", error);

    return { ok: false, message: "Tente novamente mais tarde!" };
  }
};
