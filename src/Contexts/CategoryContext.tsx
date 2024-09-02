import React, { createContext, ReactNode, useEffect, useState } from "react";

import { ICategory } from "../Screens/Categories/props";
import { handleGetCategories } from "../Screens/Categories/actions";

interface AuthProviderProps {
  children: ReactNode;
}

export const CategoryContext = createContext<ICategory[]>({} as ICategory[]);

export const CategoriesProvider: React.FC<AuthProviderProps> = ({
  children,
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await handleGetCategories();

      if (response) {
        setCategories(response);
      }
    };

    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={categories}>
      {children}
    </CategoryContext.Provider>
  );
};
