import { fetchBillsData } from "../../Api/getBills";
import { deleteBillById } from "../../Api/deleteBillById";
import { IBills } from "./props";

export const handleGetBills = async () => {
  const response = await fetchBillsData();
  const filteredData = filterLast30Days(response);
  return filteredData;
};

const filterLast30Days = (data: IBills[]) => {
  const today = new Date();
  const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 120));

  return data.filter((item) => {
    const buyDate = new Date(item.buy_date);
    return buyDate >= thirtyDaysAgo;
  });
};

export const handleDeleteBill = async (bill_id: string) => {
  const response = await deleteBillById(bill_id);

  if (response.status !== 200) {
    return { ok: false, message: response.data.message };
  }

  return { ok: true, message: "Conta deletada!" };
};
