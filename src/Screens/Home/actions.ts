import { updateMonthlyBills } from "../../Api/Bills";

export const handleUpdateMonthlyBills = async () => {
  const response = await updateMonthlyBills();
  return response.data;
};
