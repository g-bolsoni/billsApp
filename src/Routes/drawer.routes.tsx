import { createDrawerNavigator } from "@react-navigation/drawer";
import { StackRoutes } from "./stack.routes";
import DrawerContent from "../../DrawerContent";

export function DrawerRoutes() {
  const { Navigator, Screen } = createDrawerNavigator();
  return (
    <Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="DrawerHome" component={StackRoutes} />
    </Navigator>
  );
}
