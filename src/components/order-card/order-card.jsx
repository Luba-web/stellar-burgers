import React, { useMemo } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import styles from "./order-card.module.css";
import PropTypes from "prop-types";

import { getCorrectDate } from "../../utils/getDate";
import { statusObj, countSumPrice } from "../../utils/utils";

const OrderCard = ({ onOpen, item, arr, url, status = undefined }) => {
  const id = item._id;

  const { ingredients } = useSelector((store) => store.burgerIngredients);

  const location = useLocation();

  //форматирование даты
  const timeOrder = getCorrectDate(item?.createdAt);

  //записываем все ингридиенты
  const totalIngredients = arr.map((id) => {
    return ingredients.find((item) => item._id === id);
  });

  //не больше 6 картинок ингридиентов, и на 6 пишем сколько еще есть
  const overflowImg = (arr) => {
    if (arr.length - 5 > 0) return `+${arr.length - 5}`;
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
                alt={item.name}
              />
            ))}
            <p className={styles.overflow}>{overflowImg(totalIngredients)}</p>
          </div>
          <div className={styles.container_sum}>
            <p className={`${styles.sum} text text_type_digits-default mr-2`}>
              {countSumPrice(totalIngredients)}
            </p>
            <CurrencyIcon />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default OrderCard;

OrderCard.propTypes = {
  onOpen: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  arr: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
  status: PropTypes.string,
};
