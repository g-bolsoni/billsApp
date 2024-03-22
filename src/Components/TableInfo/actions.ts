import { fetchBillsData } from "../../Api/getBills";
import { IBills } from "./props";

export const handleGetBills = async () => {
  const response = await fetchBillsData();
  const filteredData = filterLast30Days(response);
  return filteredData

}

const filterLast30Days = (data: IBills[]) => {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));

  return data.filter(item => {
      const buyDate = new Date(item.buy_date);
      return buyDate >= thirtyDaysAgo;
  });
};
