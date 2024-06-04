import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../Contexts/AuthContext';

import { styles } from './styles';
import { RootStackParamList } from '../../../navigation';
import { handleLogin } from './actions';

import logo from '../../../assets/logo.png';
import Toast from 'react-native-toast-message';

const schemaForm = z.object({
  email: z
    .string()
    .email({ message: 'Insira um endereço de e-mail válido' })
    .min(1, 'Campo obrigatório'),

  password: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
});

type IUser = z.infer<typeof schemaForm>;

export function LoginComponent() {
  const { signIn } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<IUser>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(schemaForm)
  });


  const onSubmit = async (data: IUser) => {
    const { ok, message } = await handleLogin(data.email, data.password, signIn);

    if (ok) {
      Toast.show({
        type: 'success',
        text1: 'Login efetuado com sucesso!',
      });
      // Navegar para a Home
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
      return;
    }

    Toast.show({
      type: 'error',
      text1: 'Ops!, verifique suas credencias.',
    });

  };

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.logoSection}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.title}>Gb Money</Text>
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            onChangeText={(text) => setValue('email', text)}
          />
          {errors.email?.message && <Text style={styles.error}>{errors.email.message}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={(text) => setValue('password', text)}
          />
          {errors.password?.message && <Text style={styles.error}>{errors.password.message}</Text>}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={Object.keys(errors).length > 0}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Não possui cadastro?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}