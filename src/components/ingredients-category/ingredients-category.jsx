import React, { useMemo } from "react";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredients-category.module.css";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import { useDrag } from "react-dnd";
import { useLocation, Link } from "react-router-dom";

const IngredientsCategory = ({ elem, onClick }) => {
  const { bun, ingredientsConstructor } = useSelector((store) => store.dnd);

  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredients",
    item: { elem },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  //При захвате ингредиента изменить его
  const opacity = isDragging ? 0.3 : 1;

  //расчет количества ингридиентов в конструкторе
  const counter = useMemo(
    () =>
      (count = 0) => {
        for (let { _id } of ingredientsConstructor)
          if (_id === elem._id) count++;

        if (bun && bun._id === elem._id) return 2;
        return count;
      },
    [bun, ingredientsConstructor, elem._id]
  );

  const location = useLocation();

  return (
    <Link
      to={{
        pathname: `/ingredients/${elem._id}`,
        state: { background: location },
      }}
      className={styles.link}
    >
      <>
        <li
          className={`${styles.item} mt-6 ml-4 mr-6`}
          key={elem._id}
          onClick={() => onClick(elem)}
          ref={dragRef}
          style={{ opacity }}
        >
          <img src={elem.image} alt={elem.name} />
          <div className={`${styles.priceTitle} pt-1 pb-1`}>
            <p className="text text_type_digits-default mr-2">{elem.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className="text text_type_main-default">{elem.name}</p>
          <div className={`${styles.count}`}>
            {counter() > 0 && <Counter count={counter()} size="default" />}
          </div>
        </li>
      </>
    </Link>
  );
};

IngredientsCategory.propTypes = {
  elem: PropTypes.object.isRequired,
  onclick: PropTypes.func,
};

export default IngredientsCategory;
