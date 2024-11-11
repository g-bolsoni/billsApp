import React, { useContext } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { styles } from "./styles";
import { RootStackParamList } from "../../../navigation";

import logo from "../../../assets/logo.png";
import { ForgotPasswordContext } from "../../Contexts/ForgotPassword";
import { changePassword } from "./actions";
import Toast from "react-native-toast-message";

const schemaForm = z
  .object({
    code: z.string().min(5, "Campo obrigatório"),
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

type IForgotPassword = z.infer<typeof schemaForm>;

export function ResetPasswordConfirmation() {
  const { email, setEmail } = useContext(ForgotPasswordContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    setError,
  } = useForm<IForgotPassword>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(schemaForm),
  });

  const onSubmit = async (data: IForgotPassword) => {
    const resetPasswordConfirmData = {
      ...data,
      email: email,
    };

    try {
      const resetPasswordConfirm = await changePassword(
        resetPasswordConfirmData
      );

      if (resetPasswordConfirm.status != 200) {
        throw new Error(resetPasswordConfirm.data.message);
      }

      Toast.show({
        type: "success",
        text1: resetPasswordConfirm.data.message,
      });

      setEmail("");
      navigation.navigate("Login");
    } catch (error: any) {
      const { field, message } = error.response.data;

      setError(field, {
        message: message,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardHeader}>
        <View style={styles.logoSection}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.logoTitle}>Gb Money</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Código de Verificação </Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setValue("code", text)}
          />
          {errors.code?.message && (
            <Text style={styles.error}>{errors.code.message}</Text>
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Digite a nova senha</Text>
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
          <Text style={styles.label}>Confirme a nova senha</Text>
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
          {errors.root?.message && (
            <Text style={styles.error}>{errors.root.message}</Text>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>
              {isSubmitting ? "Redefinindo ..." : "Redifinir Senha"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.link}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
