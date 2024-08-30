import { createCategory } from "../../Api/Categories/create";
import { ICategory } from "../Categories/props";

export const handleCreateCategory = async (data: ICategory) => {
  const response = await createCategory(data);

  if (response.status === 201) {
    return true;
  }

  console.error(response);
  return false;
};
