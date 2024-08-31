import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../Screens/Home";
import { Forms } from "../Screens/Forms";
import { Login } from "../Screens/Login";
import { Categories } from "../Screens/Categories";
import { CategoryForms } from "../Screens/CategoriesForms";
import { Register } from "../Screens/Register";
import { useAuth } from "../Contexts/AuthContext";
import { RootStackParamList } from "../../navigation";
import { BillsProvider } from "../Contexts/BillsContext";
import { CategoriesProvider } from "../Contexts/CategoryContext";

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export function StackRoutes() {
  const { user } = useAuth();

  return (
    <BillsProvider>
      <CategoriesProvider>
        <Navigator>
          {user ? (
            <>
              <Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Screen
                name="Forms"
                component={Forms}
                options={{ headerShown: false }}
              />
              <Screen
                name="Categories"
                component={Categories}
                options={{ headerShown: false }}
              />
              <Screen
                name="CategoriesForms"
                component={CategoryForms}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
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
            </>
          )}
        </Navigator>
      </CategoriesProvider>
    </BillsProvider>
  );
}
