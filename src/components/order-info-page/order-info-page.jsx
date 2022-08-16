import React, { useEffect, useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCorrectDate } from "../../utils/getDate";

import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-info-page.module.css";
import { statusObj, countSumPrice } from "../../utils/utils";

export const OrderInfoPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { ingredients } = useSelector((store) => store.burgerIngredients);
  const { orders } = useSelector((store) => store.ws);

  const { id } = useParams();
  const card = orders?.find((el) => el._id === id);

  //при обновлении или открытии через ссылку запоминает и открывает страницу
  useEffect(() => {
    if (!card) {
      history.replace(`${id}`);
    }
  }, [dispatch, card, history, id]);

  //записываем все ингридиенты
  const totalIngredients = useMemo(
    () =>
      card?.ingredients.map((id) => {
        return ingredients.find((item) => item._id === id);
      }),
    [card]
  );

  //Делаем уникальность ингридиентов и записываем их повторение в св-во count
  const uniqueIngredients = (arrIngredients) => {
    const obj = {};
    arrIngredients.forEach((item) => {
      const name = item.name;
      if (name in obj) {
        obj[name].count++;
      } else {
        obj[name] = item;
        obj[name].count = 1;
      }
    });
    return Object.values(obj);
  };

  //форматирование даты
  const timeOrder = getCorrectDate(card?.createdAt);

  return (
    card && (
      <div className="p-6">
        <p className={`${styles.number} text text_type_digits-default`}>
          #{card.number}
        </p>
        <h2 className="text text_type_main-medium mt-10">{card.name}</h2>
        <p className={`${styles.status} text text_type_main-default mt-3`}>
          {statusObj[card.status]}
        </p>
        <h3 className="text text_type_main-medium mt-15">Состав:</h3>
        <ul className={styles.block}>
          {uniqueIngredients(totalIngredients).map((item, index) => (
            <li
              className={`${styles.list} text text_type_main-default mb-4 mr-6`}
              key={index}
            >
              <img
                className={`${styles.image} mr-4`}
                src={item.image_mobile}
                alt={item.name}
              />
              <p className={`${styles.text} text text_type_main-default mt-3`}>
                {item.name}
              </p>
              <div
                className={`${styles.container} text text_type_digits-default`}
              >
                <p
                  className={`${styles.text} text text_type_main-default mr-2`}
                >
                  {item.count} x {item.price}
                </p>
                <CurrencyIcon />
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.container_total}>
          <p className="text text_type_main-small text_color_inactive">
            {timeOrder}
          </p>
          <div className={`${styles.total} mb-2`}>
            <p className={`${styles.text} text text_type_digits-default mr-2`}>
              {countSumPrice(totalIngredients)}
            </p>
            <CurrencyIcon />
          </div>
        </div>
      </div>
    )
  );
};

export default OrderInfoPage;
