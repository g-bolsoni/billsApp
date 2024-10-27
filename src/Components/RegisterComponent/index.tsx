import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { NavigationProp, useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import { RootStackParamList } from "../../../navigation";
import { handleRegister } from "./actions";
import { useAuth } from "../../Contexts/AuthContext";

import logo from "../../../assets/logo.png";
import Toast from "react-native-toast-message";

const schemaForm = z
  .object({
    name: z.string().min(2, "Este campo é obrigatório"),

    email: z
      .string()
      .email({ message: "Insira um endereço de e-mail válido" })
      .min(1, "Campo obrigatório"),

    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .refine((value) => /[A-Z]/.test(value), {
        message: "A senha deve conter pelo menos uma letra maiúscula",
      })
      .refine((value) => /[^A-Za-z0-9]/.test(value), {
        message: "A senha deve conter pelo menos um caractere especial",
      }),

    confirmPassword: z.string().min(1, "Campo obrigatório"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "As senhas não coincidem",
        code: "custom",
      });
    }
  });

type IUser = z.infer<typeof schemaForm>;

export function RegisterComponent() {
  const { signIn } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IUser>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(schemaForm),
  });

  const onSubmit = async (data: IUser) => {
    const { ok, message } = await handleRegister(data, signIn);

    if (ok) {
      Toast.show({
        type: "success",
        text1: "Login efetuado com sucesso!",
      });

      // Navigate to Home
      navigation.navigate("Home");
      return;
    }

    Toast.show({
      type: "error",
      text1: "Ops!, verifique suas credencias.",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardHeader}>
        <View style={styles.logoSection}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.title}>Gb Money</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setValue("name", text)}
          />
          {errors.name?.message && (
            <Text style={styles.error}>{errors.name.message}</Text>
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            onChangeText={(text) => setValue("email", text)}
          />
          {errors.email?.message && (
            <Text style={styles.error}>{errors.email.message}</Text>
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={(text) => setValue("password", text)}
          />
          {errors.password?.message && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Repita a senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            onChangeText={(text) => setValue("confirmPassword", text)}
          />
          {errors.confirmPassword?.message && (
            <Text style={styles.error}>{errors.confirmPassword.message}</Text>
          )}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
            disabled={Object.keys(errors).length > 0}
          >
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Já possui cadastro?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
