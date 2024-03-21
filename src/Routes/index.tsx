import { NavigationContainer } from "@react-navigation/native";
import { BottomTabs } from "./tabs.routes";
import { StackRoutes } from "./stack.routes";

export function Routes() {
    return (
        <NavigationContainer>
            {/* <BottomTabs /> */}
            <StackRoutes />
        </NavigationContainer>
    )
}