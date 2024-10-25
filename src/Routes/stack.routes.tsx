import { useNavigation, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, StyleSheet, Text, View } from "react-native";

import Icon from "react-native-vector-icons/Entypo";
import logo from "../../assets/logo.png";
import { Home } from "../Screens/Home";
import { Forms } from "../Screens/Forms";
import { Login } from "../Screens/Login";
import { Categories } from "../Screens/Categories";
import { Profile } from "../Screens/Profile";
import { CategoryForms } from "../Screens/CategoriesForms";
import { Register } from "../Screens/Register";
import { useAuth } from "../Contexts/AuthContext";
import { RootStackParamList } from "../../navigation";
import { BillsProvider } from "../Contexts/BillsContext";
import { CategoriesProvider } from "../Contexts/CategoryContext";
import { colors } from "../Constants/Colors";
import { EditProfile } from "../Screens/EditProfile";
import React from "react";

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export function StackRoutes() {
  const { user } = useAuth();
  const navigation = useNavigation();

  return (
    <>
      {user ? (
        <BillsProvider>
          <CategoriesProvider>
            <Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: colors.gray[700],
                },
                headerTintColor: colors.gray[200],
                headerTitleAlign: "left",
                headerTitle: (props) => (
                  <View style={styles.logoSection}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.title}>Gb Money</Text>
                  </View>
                ),
              }}
            >
              <Screen
                name="Home"
                component={Home}
                options={{
                  headerLeft: () => {
                    return (
                      <Icon
                        name="menu"
                        style={{ marginStart: 20 }}
                        onPress={() =>
                          navigation.dispatch(DrawerActions.openDrawer())
                        }
                        size={30}
                        color="#fff"
                      />
                    );
                  },
                }}
              />
              <Screen
                name="Categories"
                component={Categories}
                options={{
                  headerLeft: () => {
                    return (
                      <Icon
                        name="menu"
                        style={{ marginStart: 20 }}
                        onPress={() =>
                          navigation.dispatch(DrawerActions.openDrawer())
                        }
                        size={30}
                        color="#fff"
                      />
                    );
                  },
                }}
              />
              <Screen
                name="Profile"
                component={Profile}
                options={{
                  headerLeft: () => {
                    return (
                      <Icon
                        name="menu"
                        style={{ marginStart: 20 }}
                        onPress={() =>
                          navigation.dispatch(DrawerActions.openDrawer())
                        }
                        size={30}
                        color="#fff"
                      />
                    );
                  },
                }}
              />
              <Screen name="Forms" component={Forms} />
              <Screen name="CategoriesForms" component={CategoryForms} />
              <Screen name="EditProfile" component={EditProfile} />
            </Navigator>
          </CategoriesProvider>
        </BillsProvider>
      ) : (
        <Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.gray[700],
            },
            headerTintColor: colors.gray[200],
            headerTitleAlign: "left",
            headerTitle: (props) => (
              <View style={styles.logoSection}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.title}>Gb Money</Text>
              </View>
            ),
          }}
        >
          <Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
        </Navigator>
      )}
    </>
  );
}

export const styles = StyleSheet.create({
  logoSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 20,
    height: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.gray[200],
    textAlign: "center",
  },
});
