import { ImageSourcePropType } from "react-native";

export interface ICards {
  title: string;
  imageSource: ImageSourcePropType;
  value: number;
}

export interface IBills {
  _id: string;
  bill_name: string;
  bill_category: string;
  bill_type: 'Income' | 'Expenses';
  buy_date: string;
  payment_type: string;
  bill_value: number;
  repeat: boolean;
  installments: string;
  fixed: boolean;
}
