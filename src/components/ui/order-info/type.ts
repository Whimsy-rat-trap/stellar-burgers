import { TIngredient } from '@utils-types';

export type OrderInfoUIProps = {
  orderInfo: TOrderInfo;
};

export type TOrderInfo = {
  createdAt: string;
  ingredients: string[];
  _id: string;
  status: string;
  name: string;
  updatedAt: string;
  number: number;
  ingredientsInfo: {
    [key: string]: TIngredient & { count: number };
  };
  date: Date;
  total: number;
};
