import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerUser } from '../../Api/registerUser';
import { fetchAuthLogin } from '../../Api/loginUser';

export const handleRegister = async (name: string, email: string, password: string, confirmPassword: string, signIn: Function, navigation: any) => {
  try {
    const data = await registerUser(name, email, password, confirmPassword);

    // Logar o usuário
    const loginData = await fetchAuthLogin(email, password);

    // Armazenar o token e logar o usuário
    signIn({ token: loginData.token, email: loginData.email });

    // Armazenar no AsyncStorage
    await AsyncStorage.setItem('@App:user', data.email);
    await AsyncStorage.setItem('@App:token', data.token);

    // Navegar para a Home
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  } catch (error) {
    console.error('Erro ao registrar:', error);
  }
};
