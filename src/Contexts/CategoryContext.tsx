import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

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

  const fetchCategories = useCallback(async () => {
    const response = await handleGetCategories();
    console.log(response);

    if (response) {
      setCategories(response);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <CategoryContext.Provider value={categories}>
      {children}
    </CategoryContext.Provider>
  );
};
