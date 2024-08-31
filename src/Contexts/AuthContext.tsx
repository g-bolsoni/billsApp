import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextData {
  user: any;
  signIn: (userData: any) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storagedUser = await AsyncStorage.getItem("@App:user");
        const storagedToken = await AsyncStorage.getItem("@App:token");

        if (storagedUser && storagedToken) {
          setUser({ email: storagedUser, token: storagedToken });
        }
      } catch (error) {
        console.error(
          "Erro ao carregar dados de autenticação do AsyncStorage",
          error
        );
      }
    };

    loadStorageData();
  }, []);

  const signIn = async (userData: any) => {
    console.log(userData);

    setUser(userData);
    await AsyncStorage.setItem("@App:user", userData.email);
    await AsyncStorage.setItem("@App:token", userData.token);
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem("@App:user");
    await AsyncStorage.removeItem("@App:token");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
