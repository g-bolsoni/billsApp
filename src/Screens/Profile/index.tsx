import React, { useContext } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { AuthContext } from "../../Contexts/AuthContext";
import {
  useNavigation,
  DrawerActions,
  NavigationProp,
} from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation";
import { handleUpdateUser } from "./actions";
import Toast from "react-native-toast-message";

export function Profile() {
  const { signOut, user } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Functions
  const handleLogout = async () => {
    await signOut();
    navigation.dispatch(DrawerActions.closeDrawer());

    // navigation.navigate("Login");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const handleDeleteAccount = async () => {
    const deleteUer = await handleUpdateUser();

    await signOut();
    navigation.navigate("Login");

    if (!deleteUer.ok) {
      Toast.show({
        type: "error",
        text1: deleteUer.message,
      });
      return;
    }

    Toast.show({
      type: "success",
      text1: deleteUer.message,
    });
  };

  return (
    <>
      <SafeAreaView style={styles.profileContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.containerBody}>
            {/* Header */}
            <View style={styles.containerTitle}>
              <Text style={styles.title}> Informações de cadastro</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingHorizontal: 10,
                }}
              >
                <Text style={styles.textName}>{user?.name},</Text>
                <Text style={styles.text}> aqui estão seus dados</Text>
              </View>
              <Text style={[styles.smalText, { paddingHorizontal: 10 }]}>
                Lembre-se que seu E-MAIL não pode ser alterado
              </Text>
            </View>

            {/* Inputs */}
            <View style={styles.inputGroupContainer}>
              <TouchableOpacity
                style={styles.buttonEdit}
                onPress={() => navigation.navigate("EditProfile")}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Editar
                </Text>
              </TouchableOpacity>
              <View style={styles.inputContainer}>
                <Text
                  style={styles.label}
                  aria-label="username"
                  nativeID="labelUsername"
                >
                  Nome
                </Text>
                <TextInput
                  style={styles.inputText}
                  aria-label="input"
                  editable={false}
                  value={user?.name}
                  aria-labelledby="labelUsername"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text
                  style={styles.label}
                  aria-label="email"
                  nativeID="labelEmail"
                >
                  E-mail
                </Text>
                <TextInput
                  style={styles.inputText}
                  aria-label="input"
                  value={user?.email}
                  editable={false}
                  selectTextOnFocus={false}
                  aria-labelledby="labelEmail"
                />
              </View>
            </View>
          </View>

          {/* Sair conta */}
          <View style={styles.footerContainer}>
            <View style={styles.logoutContainer}>
              <Text style={styles.smalText}>
                Para sair do seu perfil, clique abaixo!
              </Text>
              <TouchableOpacity
                style={styles.logout}
                onPress={() => handleLogout()}
              >
                <Text style={styles.logoutText}>SAIR DA CONTA</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.deleteAccountContainer}>
              <Text style={styles.smalText}>
                Para excluir sua conta do aplicativo GBMoney. clique no botão
                abaixo.
              </Text>

              <TouchableOpacity onPress={() => handleDeleteAccount()}>
                <Text style={styles.deleteAccountText}>
                  EXCLUIR MINHA CONTA
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
