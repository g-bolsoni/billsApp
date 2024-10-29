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
import { resetPassword } from "./actions";
import { ForgotPasswordContext } from "../../Contexts/ForgotPassword";
import Toast from "react-native-toast-message";

const schemaForm = z.object({
  email: z
    .string()
    .email({ message: "Insira um endereço de e-mail válido" })
    .min(1, "Campo obrigatório"),
});

type IForgotPassword = z.infer<typeof schemaForm>;

export function ForgotPassword() {
  const { setEmail } = useContext(ForgotPasswordContext);
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
    try {
      const result = await resetPassword(data);

      if (result.status != 200) {
        console.log(result.data);
        throw new Error();
      }

      setEmail(data.email);
      navigation.navigate("ResetPasswordConfirmation");
    } catch (error: any) {
      setError("email", {
        message: error.response.data.message,
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
        <View style={styles.textContainer}>
          <Text style={styles.title}>Esqueceu sua senha?</Text>
          <Text style={[styles.label, { textAlign: "center" }]}>
            Insira o seu e-mail abaixo para fazer a redefinição da sua senha
          </Text>
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
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>
              {isSubmitting ? "Enviando email..." : "Resetar Senha"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Voltar ao Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
