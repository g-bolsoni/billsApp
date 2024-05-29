import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../Screens/Home';
import { Forms } from '../Screens/Forms';
import { Login } from '../Screens/Login';
import { Register } from '../Screens/Register';
import { useAuth } from '../Contexts/AuthContext';
import { RootStackParamList } from '../../navigation';

const { Navigator, Screen } = createStackNavigator<RootStackParamList>();

export function StackRoutes() {
  const { user } = useAuth();
  console.log(user);

  return (
    <Navigator>
      {user ? (
        <>
          <Screen name="Home" component={Home} options={{ headerShown: false, }} />
          <Screen name="Forms" component={Forms} options={{ headerShown: false, }} />
        </>
      ) : (
        <>
          <Screen name="Login" component={Login} options={{ headerShown: false, }} />
          <Screen name="Register" component={Register} options={{ headerShown: false, }} />
        </>
      )
      }
    </Navigator>
  );
}