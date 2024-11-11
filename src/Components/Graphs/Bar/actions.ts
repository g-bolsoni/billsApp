import { monthlyExpenses } from "../../../Api/Bills";

interface IMonthlyExpenses {
  _id: {
    month: number;
    year: string;
  };
  total_expense: number;
}

export const getAllMonthlyExpenses = async () => {
  const result = await monthlyExpenses();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const formattedData = result.map(
    ({ _id, total_expense }: IMonthlyExpenses) => {
      const month = monthNames[_id.month - 1];
      const year = _id.year.toString().slice(-2);

      return {
        month: `${month}`,
        total_expense,
      };
    }
  );

  return formattedData;
};
