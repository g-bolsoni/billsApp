import { createBill } from "../../Api/createBill";
import { IBills } from "./props";

export const handleCreateBill = async (data: IBills) => {
  const response = await createBill(data);

  if (response.status === 200) {
    return true;
  }

  console.error(response);
  return false;
}