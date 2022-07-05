import React, { useMemo, useState } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientsConstructor from "../ingredients-constructor/ingredients-constructor";

import { getOrderFetch } from "../../utils/api";
import { GET_ORDER_SUCCESS, DELETE_ORDER } from "../../services/actions/order";

import { useSelector, useDispatch } from "react-redux";

import { useDrop } from "react-dnd";
import {
  ADD_INGREDIENTS_CONSTRUCTOR,
  ADD_BUN,
} from "../../services/actions/dnd";

const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false); //стейт для ордера

  const { bun, ingredientsConstructor } = useSelector((state) => state.dnd);

  //добавление ингредиентов в конструктор
  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop(itemDrop) {
      if (itemDrop.elem.type === "bun") {
        dispatch({
          type: ADD_BUN,
          data: itemDrop.elem,
        });
      } else {
        dispatch({
          type: ADD_INGREDIENTS_CONSTRUCTOR,
          data: { ...itemDrop.elem, id: Date.now() },
        });
      }
    },
  });

  //расчет стоимости бургера
  const totalPrice = useMemo(
    () =>
      (bun, ingredientsConstructor, sum = 0) => {
        for (let { price } of ingredientsConstructor) sum += price;
        return sum + (bun.price || 0) * 2;
      },
    []
  );

  //получаем id игредиентов
  const idIngredients = (ingredients, mass = []) => {
    for (let { _id } of ingredients) mass.push(_id);
    return mass;
  };

  const total = totalPrice(bun, ingredientsConstructor);

  // открытие модального окна ордеров
  const handleOrderClick = () => {
    getOrderFetch(idIngredients(ingredientsConstructor))
      .then((res) => {
        dispatch({ type: GET_ORDER_SUCCESS, data: res.order.number });

        // открытие модального окна за счет изменения state
        setOrderDetailsOpened(true);
      })
      .catch((err) => console.log(err));
  };

  // Закрытие модального окна
  const closeModals = () => {
    setOrderDetailsOpened(false);
    dispatch({ type: DELETE_ORDER });
  };

  return (
    <section className={`${styles.container} mt-25 `} ref={dropTarget}>
      {bun.length === 0 ? (
        <p
          className={`${styles.textDownloads} text text_type_main-large text_color_inactive mt-15`}
        >
          Место для булочки
        </p>
      ) : (
        <div className={`${styles.blockBun}`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}

      {ingredientsConstructor.length === 0 ? (
        <p
          className={`${styles.textDownloads} text text_type_main-large text_color_inactive mt-15`}
        >
          Нету ручки нет конфетки...
        </p>
      ) : (
        <div className={`${styles.block} mt-4 mb-4`}>
          <ul className={styles.list}>
            {ingredientsConstructor.map((element, index) => (
              <IngredientsConstructor
                id={element.id}
                index={index}
                key={element.id}
                element={element}
              />
            ))}
          </ul>
        </div>
      )}

      {bun.length === 0 ? (
        <p
          className={`${styles.textDownloads} text text_type_main-large text_color_inactive mt-15`}
        >
          Место для булочки
        </p>
      ) : (
        <div className={`${styles.blockBun} mt-4`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}

      <div className={`${styles.priceBox} pt-10`}>
        <div className={`${styles.priceStyle} `}>
          <p>
            <span className="text text_type_digits-medium pr-2">{total}</span>
          </p>
          <CurrencyIcon type="primary" />
        </div>
        {bun.length === 0 || ingredientsConstructor.length === 0 ? (
          <Button type="primary" onClick={handleOrderClick} disabled>
            Оформить заказ
          </Button>
        ) : (
          <Button type="primary" onClick={handleOrderClick}>
            Оформить заказ
          </Button>
        )}
      </div>
      {isOrderDetailsOpened && (
        <Modal title="" onClose={closeModals}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
// disabled={(bun.length === 0) || (ingredientsConstructor.length === 0)}
