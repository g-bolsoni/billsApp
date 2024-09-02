import { deleteCategoryById } from "../../Api/Categories/delete";
import { fetchCategoriesData } from "../../Api/Categories/getCategories";

export const handleGetCategories = async () => {
  const response = await fetchCategoriesData();

  return response;
};

export const handleDeleteCategory = async (category_id: String) => {
  const response = await deleteCategoryById(category_id);

  if (response.status !== 201) {
    return { ok: false, message: response.data.message };
  }

  return { ok: true, message: "Conta deletada!" };
};
