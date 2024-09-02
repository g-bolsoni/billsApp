import React, { createContext, ReactNode, useEffect, useState } from "react";
import { IBills } from "../Components/Cards/props";
import { handleGetBills } from "../Components/TableInfo/actions";

interface AuthProviderProps {
  children: ReactNode;
}

interface BillsContextType {
  bills: IBills[];
  setBills: React.Dispatch<React.SetStateAction<IBills[]>>;
}

export const BillsContext = createContext<BillsContextType>({
  bills: [],
  setBills: () => {},
});

export const BillsProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [bills, setBills] = useState<IBills[]>([]);

  useEffect(() => {
    const fetchBills = async () => {
      const response = await handleGetBills();

      if (response) {
        setBills(response);
      }
    };

    fetchBills();
  }, []);

  return (
    <BillsContext.Provider value={{ bills, setBills }}>
      {children}
    </BillsContext.Provider>
  );
};
