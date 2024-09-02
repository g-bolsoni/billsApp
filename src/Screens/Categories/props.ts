export interface ICategory {
  _id: string;
  name: string;
  description?: string;
  category_type: "Income" | "Expenses";
  color?: string;
  icon?: string;
  budget: string;
  isActive: boolean;
}
