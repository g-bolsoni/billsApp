import React, { createContext, ReactNode, useEffect, useState } from "react";
import { IBills } from "../Components/Cards/props";
import { handleGetBills } from "../Components/TableInfo/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IForgotPassword } from "../Screens/ForgotPassword/props";

interface AuthProviderProps {
  children: ReactNode;
}
interface ForgotPasswordContextType {
  email: string;
  setEmail: (email: string) => void;
}

export const ForgotPasswordContext = createContext<ForgotPasswordContextType>({
  email: "",
  setEmail: () => {},
});

export const ForgotPasswordProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [email, setEmail] = useState<string>("");

  return (
    <ForgotPasswordContext.Provider value={{ email, setEmail }}>
      {children}
    </ForgotPasswordContext.Provider>
  );
};
