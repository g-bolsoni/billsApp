import { fetchAuthLogin } from "../../Api/loginUser";

import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleLogin = async (email: string, password: string, signIn: Function) => {
  try {
    const { message, Token } = await fetchAuthLogin(email, password);

    if (message !== "Auth token is valid") {
      console.error('Erro de autenticação:', message);
      return { ok: false, message: message };
    }

    // Armazenar o token e logar o usuário
    signIn({ token: Token, email: email });

    // Armazenar no AsyncStorage
    await AsyncStorage.setItem('@App:user', email);
    await AsyncStorage.setItem('@App:token', Token);

    return { ok: true, message: message };

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return { ok: false, message: 'Tente novamente mais tarde!' };
  }
}