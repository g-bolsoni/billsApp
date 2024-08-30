import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IBills } from "../Components/Cards/props";
import { handleGetBills } from "../Components/TableInfo/actions";

interface AuthProviderProps {
  children: ReactNode;
}

export const BillsContext = createContext<IBills[]>({} as IBills[]);

export const BillsProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [bills, setBills] = useState<IBills[]>([]);

  const fetchBills = useCallback(async () => {
    const response = await handleGetBills();
    if (response) {
      setBills(response);
    }
  }, []);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  return (
    <BillsContext.Provider value={bills}>{children}</BillsContext.Provider>
  );
};
