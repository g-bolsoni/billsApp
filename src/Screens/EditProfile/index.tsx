import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { styles } from "./styles";
import { AuthContext } from "../../Contexts/AuthContext";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation";
import { handleUpdateUser } from "./actions";
import Toast from "react-native-toast-message";

export function EditProfile() {
  const { user, setUser } = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [newName, setNewName] = useState(user.name);

  const editProfileInfo = async () => {
    const data = { name: newName };
    const updateUser = await handleUpdateUser(data);

    if (!updateUser.ok) {
      Toast.show({
        type: "error",
        text1: updateUser.message,
      });
      return;
    }

    setUser({
      email: user.email,
      name: newName,
      token: user.token,
    });

    navigation.navigate("Profile");

    Toast.show({
      type: "success",
      text1: updateUser.message,
    });
  };

  // Functions
  return (
    <>
      <SafeAreaView style={styles.profileContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.containerBody}>
            {/* Header */}
            <View style={styles.containerTitle}>
              <Text style={styles.title}>
                Alterando informações de cadastro
              </Text>

              <Text style={[styles.smalText, { paddingHorizontal: 10 }]}>
                Lembre-se que seu E-MAIL não pode ser alterado
              </Text>
            </View>

            {/* Inputs */}
            <View style={styles.inputGroupContainer}>
              <TouchableOpacity
                style={styles.buttonEdit}
                onPress={() => editProfileInfo()}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Salvar
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
                  value={newName}
                  onChangeText={(text) => {
                    setNewName(text);
                  }}
                  aria-labelledby="labelUsername"
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
