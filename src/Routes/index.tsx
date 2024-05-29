import { NavigationContainer } from "@react-navigation/native";
import { BottomTabs } from "./tabs.routes";
import { StackRoutes } from "./stack.routes";
import { AuthProvider } from "../Contexts/AuthContext";

export function Routes() {
    return (
        <NavigationContainer>
            <AuthProvider >
                {/* <BottomTabs /> */}
                <StackRoutes />
            </AuthProvider>
        </NavigationContainer>
    )
}