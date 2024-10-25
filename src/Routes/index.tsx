import React from "react";
import Toast from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";

import { DrawerRoutes } from "./drawer.routes";
import { AuthProvider } from "../Contexts/AuthContext";

export function Routes() {
  return (
    <>
      <NavigationContainer>
        <DrawerRoutes />
      </NavigationContainer>
      <Toast />
    </>
  );
}
