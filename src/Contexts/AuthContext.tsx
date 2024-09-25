import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IUser {
  name: string;
  email: string;
  token: string;
}

interface AuthContextData {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  signIn: (userData: any) => void;
  signOut: () => void;
}

interface UserData {
  name: string;
  email: string;
  token: string;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

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
          const userInfo = JSON.parse(storagedUser);

          setUser({
            email: userInfo.email,
            name: userInfo.name,
            token: storagedToken,
          });
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

  const signIn = async (userData: UserData) => {
    setUser(userData);

    await AsyncStorage.setItem("@App:token", userData.token);
    await AsyncStorage.setItem(
      "@App:user",
      JSON.stringify({
        email: userData.email,
        name: userData.name,
      })
    );
  };

  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem("@App:user");
    await AsyncStorage.removeItem("@App:token");
  };

  return (
    <AuthContext.Provider value={{ setUser, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
