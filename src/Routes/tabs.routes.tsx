import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Navigator, Screen } = createBottomTabNavigator();
import { Home } from '../Screens/Home';
import { Forms } from '../Screens/Forms';

import { MaterialCommunityIcons } from '@expo/vector-icons';


export function BottomTabs() {
    return (
        <Navigator>
            <Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name='home-analytics' color="#000" size={size} />
                    ),
                    tabBarShowLabel: false,
                }} />
            <Screen name="Forms" component={Forms} options={{ tabBarShowLabel: false }} />
        </Navigator>
    );
}