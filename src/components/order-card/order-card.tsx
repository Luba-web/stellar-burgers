import React, { FC, useMemo } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../services/hooks";
import { Link, useLocation } from "react-router-dom";

import styles from "./order-card.module.css";

import { getCorrectDate } from "../../utils/getDate";
import { statusObj, countSumPrice } from "../../utils/utils";
import { ILocationState, TIngredient, TOrders} from "../../services/types/data";

interface IOrderCard {
  onOpen: () => void;
  item: TOrders;
  url: string;
  status: string;
  arr: string[];
}

const OrderCard: FC<IOrderCard> = ({ onOpen, item, url, status = "", arr }) => {
  const id = item._id;

  const { ingredients } = useSelector((store) => store.burgerIngredients);
  
  const location = useLocation<ILocationState>();

  //форматирование даты
  const timeOrder = useMemo(() => {
    if (!item)
       return
    return getCorrectDate(item?.createdAt)
 }, [item]);

  //функция для отрисовки ингридиентов
  const getId = (id: string) => {
    return ingredients.find((item) => item._id === id);
  };

  
  const getTotal = (arr = [] as Array<TIngredient>) => {
    if (!item?.ingredients) return []
    for (const id of item.ingredients) {
      const ingredientId = getId(id)
       if (ingredientId) arr.push(ingredientId)
    }
    return arr
 }

  const totalIngredients = getTotal();

  //не больше 6 картинок ингридиентов, и на 6 пишем сколько еще есть
  const overflowImg = (totalIngredients = [] as Array<TIngredient>) => {
    if (totalIngredients.length - 5 > 0) return `+${totalIngredients.length - 5}`;
  };

  return (
    <li className={`${styles.li} mb-4 mt-4 mr-2 ml-2`} onClick={() => onOpen()}>
      <Link
        className={`${styles.link} p-6`}
        to={{ pathname: `/${url}/${id}`, state: { background: location } }}
      >
        <div className={`${styles.container_time}`}>
          <p
            className={`${styles.order} text text_type_digits-default text_color_inactive`}
          >
            #{item.number}
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {timeOrder}
          </p>
        </div>
        <h2 className={`${styles.subtitle} text text_type_main-medium`}>
          {item.name}
        </h2>
        {status && (
          <p className={`${styles.status} text text_type_main-default mt-2`}>
            {statusObj[status]}
          </p>
        )}
        <div className={styles.overview_img}>
          <div className={styles.container_images}>
            {totalIngredients.slice(0, 6).map((item, index) => (
              <img
                className={styles.image}
                src={item.image_mobile}
                key={index}
                alt={item?.name}
              />
            ))}
            <p className={styles.overflow}>{overflowImg(totalIngredients)}</p>
          </div>
          <div className={styles.container_sum}>
            <p className={`${styles.sum} text text_type_digits-default mr-2`}>
              {countSumPrice(totalIngredients)}
            </p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default OrderCard;
