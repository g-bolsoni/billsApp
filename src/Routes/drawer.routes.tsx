import { createDrawerNavigator } from "@react-navigation/drawer";
import { StackRoutes } from "./stack.routes";
import DrawerContent from "../../DrawerContent";
import { AuthProvider } from "../Contexts/AuthContext";

export function DrawerRoutes() {
  const { Navigator, Screen } = createDrawerNavigator();
  return (
    <AuthProvider>
      <Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="DrawerHome" component={StackRoutes} />
      </Navigator>
    </AuthProvider>
  );
}
