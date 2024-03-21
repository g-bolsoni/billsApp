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

// const handleTotalExpenses = async () => {
//   const response = await api.get('/filter?bill_type=Expenses');
//   const totalExpenses = response.data.reduce((acc: number, item: IBills) => acc + item.bill_value, 0);
//   return totalExpenses;
// }

// export function useBillData() {
//   const income = useQuery({
//     queryFn: totalIncome,
//     queryKey: ['income-data'],
//     refetchInterval: 60 * 5 * 1000
//   });

//   const expenses = useQuery({
//     queryFn: totalExpenses,
//     queryKey: ['expenses-data'],
//     refetchInterval: 60 * 5 * 1000
//   });

//   const total = income.data - expenses.data;
//   return { income, expenses, total };
// }