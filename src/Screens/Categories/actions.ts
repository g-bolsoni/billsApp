import { fetchCategoriesData } from "../../Api/Categories/getCategories";

export const handleGetCategories = async () => {
  const response = await fetchCategoriesData();

  return response;
};
