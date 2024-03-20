import { NavigationContainer } from "@react-navigation/native";
import { BottomTabs } from "./tabs.routes";

export function Routes() {
    return (
        <NavigationContainer>
            <BottomTabs />
        </NavigationContainer>
    )
}