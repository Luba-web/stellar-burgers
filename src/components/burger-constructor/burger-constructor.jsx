import React, { useEffect, useState } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";

const BurgerConstructor = ({ arrIngredients }) => {
  const [total, setTotal] = useState(0);
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false); //стейт для ордера
  const res = [];

  //создание массива без булочек
  arrIngredients.map((item) => {
    if (item.type !== "bun") res.push(item);
  });

  //посчет итоговой суммы
  useEffect(() => {
    const price = res.reduce(
      (sum, item) => sum + item.price,
      arrIngredients[0].price
    );
    setTotal(price);
  }, [arrIngredients]);

  //открытие модального окона ордеров
  const openOrderModal = () => setOrderDetailsOpened(true);

  // Закрытие модального окна
  const closeModals = () => {
    setOrderDetailsOpened(false);
  };

  const ingredientsList = arrIngredients
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
    ));

  const bunList = arrIngredients.find((a) => a.type === "bun");

  return (
    <section className={`${styles.container} mt-25 `}>
      <div className={styles.blockBun}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bunList.name} (верх)`}
          price={bunList.price}
          thumbnail={bunList.image}
        />
      </div>
      <div className={`${styles.block} mt-4`}>
        <ul className={styles.list}>{ingredientsList}</ul>
      </div>
      <div className={styles.blockBun}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bunList.name} (низ)`}
          price={bunList.price}
          thumbnail={bunList.image}
        />
      </div>
      <div className={`${styles.priceBox} pt-10`}>
        <div className={`${styles.priceStyle} `}>
          <p>
            <span className="text text_type_digits-medium pr-2">{total}</span>
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" onClick={openOrderModal}>
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

BurgerConstructor.propTypes = {
  arrIngredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerConstructor;
