import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../Screens/Home';
import { Forms } from '../Screens/Forms';

const {Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator>
      <Screen name="Home" component={Home} />
      <Screen name="Forms" component={Forms} />
    </Navigator>
  );
}