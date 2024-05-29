import { fetchAuthLogin } from "../../Api/loginUser";

import AsyncStorage from '@react-native-async-storage/async-storage';

export const handleLogin = async (email: string, password: string, signIn: Function, navigation: any) => {
  console.log('chegou na actions');
  try {
    const data = await fetchAuthLogin(email, password);

    // Armazenar o token e logar o usuário
    signIn({ token: data.token, email: data.email });

    // Armazenar no AsyncStorage
    await AsyncStorage.setItem('@App:user', data.email);
    await AsyncStorage.setItem('@App:token', data.token);

    // Navegar para a Home
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
}