import { NavigationContainer } from "@react-navigation/native";
import { StackRoutes } from "./stack.routes";
import { AuthProvider } from "../Contexts/AuthContext";
import Toast from "react-native-toast-message";

export function Routes() {
    return (
        <>
            <NavigationContainer>
                <AuthProvider >
                    <StackRoutes />
                </AuthProvider>
            </NavigationContainer>
            <Toast />
        </>
    )
}