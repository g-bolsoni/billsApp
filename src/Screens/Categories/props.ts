export interface ICategory {
  name: string;
  description?: string;
  category_type: "Income" | "Expenses";
  color?: string;
  icon?: string;
  budget: string;
  isActive: boolean;
}
