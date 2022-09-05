import React, { useMemo, useState, FC } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientsConstructor from "../ingredients-constructor/ingredients-constructor";

import { DELETE_ORDER, getOrder } from "../../services/actions/order";

import { useDrop } from "react-dnd";
import {
  ADD_INGREDIENTS_CONSTRUCTOR,
  ADD_BUN,
} from "../../services/actions/dnd";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "../../services/hooks";
import { TIngredient } from "../../services/types/data";

type TItemDrop = {
  elem: TIngredient
}

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState<boolean>(false); //стейт для ордера

  const { bun, ingredientsConstructor } = useSelector((store) => store.dnd);

  //добавление ингредиентов в конструктор
  const [, dropTarget] = useDrop({
    accept: "ingredients",
    drop(itemDrop: TItemDrop) {
      if (itemDrop.elem.type === "bun") {
        dispatch({
          type: ADD_BUN,
          payload: itemDrop.elem,
        });
      } else {
        dispatch({
          type: ADD_INGREDIENTS_CONSTRUCTOR,
          payload: { ...itemDrop.elem, id: Date.now() },
        });
      }
    },
  });
  
  //расчет стоимости бургера
  const totalPrice = useMemo(
    () =>
      (bun: TIngredient | null, ingredientsConstructor: Array<TIngredient>, sum = 0): number => {
        for (let { price } of ingredientsConstructor) sum += price;
        return sum + (bun?.price || 0) * 2;
      },
    []
  );

  //получаем id игредиентов
  const idIngredients = (ingredients: Array<TIngredient>, mass: Array<string> = []) => {
    for (let { _id } of ingredients) mass.push(_id);
    return mass;
  };

  const total = totalPrice(bun, ingredientsConstructor);
  const user = useSelector((store) => store.user.user);

  // открытие модального окна ордера
  const handleOrderClick = () => {
    if (!user) {
      history.replace("/login");
    }
    if (user && bun) {
      //([bun, ...ingredientsConstructor, bun])); не по макету, но так красивее

      dispatch(getOrder(idIngredients([bun, ...ingredientsConstructor])));
      setOrderDetailsOpened(true);
    }
  };

  // Закрытие модального окна
  const closeModals = () => {
    setOrderDetailsOpened(false);
    dispatch({ type: DELETE_ORDER });
  };

  return (
    <section className={`${styles.container} mt-25 `} ref={dropTarget}>
      {!bun ? (
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

      {!bun ? (
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
        <Button
          type="primary"
          onClick={handleOrderClick}
          disabled={!bun || ingredientsConstructor.length === 0}
        >
          Оформить заказ
        </Button>
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
