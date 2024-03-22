import { fetchBillsData } from "../../Api/getBills";
import { IBills } from "./props";


export const handleTotalData = async () => {
  const response = await fetchBillsData();
  let totalIncome = 0;
  let totalExpenses = 0;
  let total = 0;

  response.map((item: IBills) => {
    if(item.bill_type === 'Income'){
      totalIncome += item.bill_value;
    }
    if(item.bill_type === 'Expenses'){
      totalExpenses += item.bill_value;
    }
  });

  total = totalIncome - totalExpenses;

  return {
    totalIncome,
    totalExpenses,
    total
  }
}