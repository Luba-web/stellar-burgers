import React, { useMemo, useState } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

import { saveOrder } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { GET_ORDER_SUCCESS, DELETE_ORDER } from "../../services/actions/order"


const BurgerConstructor = () => {
  //const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false); //стейт для ордера

  const { ingredients } = useSelector((state) => state.burgerIngredients);
  const { bun, ingredientsConstructor } = useSelector((state) => state.dnd);

  console.log('bun and', bun, ingredientsConstructor)
  console.log('state.burgerIngredients', ingredients)

  const countTotalPrice = useMemo(() => (bun, ingredientsConstructor, sum = 0) => {
     for (let { price } of ingredientsConstructor)
        sum += price
     return sum + ((bun.price || 0) * 2)
  }, [])

  const countTotalIngredients = (ingredients, mass = []) => {
    for (let { _id } of ingredients)
      mass.push(_id)
    return mass
    }
  
  const total = countTotalPrice(bun, ingredientsConstructor);

  const handleOrderClick = () => {

    saveOrder(countTotalIngredients(ingredients))
      .then(res => {
        dispatch({ type: GET_ORDER_SUCCESS, data: res.order.number })
        
        // открытие модального окна ордеров
        setOrderDetailsOpened(true);
      })
      .catch((err) => console.log(err));
  };

  // Закрытие модального окна
  const closeModals = () => {
    setOrderDetailsOpened(false);
    dispatch({ type: DELETE_ORDER });
  };

//{`${styles.list} text text_type_main-large text_color_inactive mt-15`}

  return (
    <section className={`${styles.container} mt-25 `}>
      <div className={styles.blockBun}>
      {bun.length === 0 ? (
        <p className={"text text_type_main-large text_color_inactive mt-15"}>
          Нету ручки нет конфетки...
        </p>
      ) : (
        
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
       
      )}
      </div>
      {ingredientsConstructor.length === 0 ? (
        <div className={`${styles.list} mt-4`}>
        <p className={"text text_type_main-large text_color_inactive mt-15"}>
          Где я... Голодно...
        </p>
        </div>
      ) : (
        <div className={`${styles.block} mt-4`}>
          <ul className={styles.list}>
            {ingredientsConstructor
              .filter((item) => item.type !== "bun")
              .map((element, index) => (
                <li className={styles.item} key={index}>
                  <DragIcon />
                  <ConstructorElement
                    text={element.name}
                    price={element.price}
                    thumbnail={element.image}
                  />
                </li>
              ))}
          </ul>
        </div>
      )}

      {bun.length === 0 ? (
        <p className={"text text_type_main-large text_color_inactive mt-15"}>
          Ой ой голодно, покорми меня...
        </p>
      ) : (
        <div className={styles.blockBun}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}

      {bun && ingredientsConstructor && (
        <div className={`${styles.priceBox} pt-10`}>
          <div className={`${styles.priceStyle} `}>
            <p>
              <span className="text text_type_digits-medium pr-2">{total}</span>
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" onClick={handleOrderClick}>
            Оформить заказ
          </Button>
        </div>
      )}

      {isOrderDetailsOpened && (
        <Modal title="" onClose={closeModals}>
          <OrderDetails />
        </Modal>
      )}

    </section>
  );
};

export default BurgerConstructor;
