import { TIngredient } from "../services/types/data";

interface IStatusObj {
  [key: string]: string;
 }

export const statusObj: IStatusObj = {
  done: "Заказ выполнен",
  created: "Заказ создан",
  pending: "Заказ готовится",
};

//расчет стоимости бургера
export const countSumPrice = (arr: Array<TIngredient>, sum = 0) => {
  for (let { price } of arr) sum += price;
  return sum;
};
