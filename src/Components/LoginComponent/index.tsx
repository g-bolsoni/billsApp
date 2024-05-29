import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAuth } from '../../Contexts/AuthContext';

import { styles } from './styles';
import { RootStackParamList } from '../../../navigation';
import { handleLogin } from './actions';
const schemaForm = z.object({
  email: z
    .string()
    .email({ message: 'Insira um endereço de e-mail válido' })
    .min(1, 'Campo obrigatório'),

  password: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .refine(value => /[A-Z]/.test(value), {
      message: 'A senha deve conter pelo menos uma letra maiúscula',
    })
    .refine(value => /[^A-Za-z0-9]/.test(value), {
      message: 'A senha deve conter pelo menos um caractere especial',
    })
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
    await handleLogin(data.email, data.password, signIn, navigation);
  };

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.logoSection}>

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