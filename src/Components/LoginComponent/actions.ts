import { fetchAuthLogin } from "../../Api/loginUser";

import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleLogin = async (email: string, password: string, signIn: Function, navigation: any) => {
  try {
    const { message, Token } = await fetchAuthLogin(email, password);

    if (message !== "Auth token is valid") {
      console.error('Erro de autenticação:', message);
      return message;
    }

    // Armazenar o token e logar o usuário
    signIn({ token: Token, email: email });

    // Armazenar no AsyncStorage
    await AsyncStorage.setItem('@App:user', email);
    await AsyncStorage.setItem('@App:token', Token);

    // Navegar para a Home
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
}