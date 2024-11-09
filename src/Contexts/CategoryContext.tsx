import React, { createContext, ReactNode, useEffect, useState } from "react";

import { ICategory } from "../Screens/Categories/props";
import { handleGetCategories } from "../Screens/Categories/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthProviderProps {
  children: ReactNode;
}

interface CategoriesContextType {
  categories: ICategory[];
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
}

export const CategoryContext = createContext<CategoriesContextType>({
  categories: [],
  setCategories: () => {},
});

export const CategoriesProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      await AsyncStorage.getItem("@App:token");
      const response = await handleGetCategories();

      if (response) {
        setCategories(response);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};
