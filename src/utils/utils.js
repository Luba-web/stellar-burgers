export const statusObj = {
  done: "Заказ выполнен",
  created: "Заказ создан",
  pending: "Заказ готовится",
};

//расчет стоимости бургера
export const countSumPrice = (arr, sum = 0) => {
  for (let { price } of arr) sum += price;
  return sum;
};
