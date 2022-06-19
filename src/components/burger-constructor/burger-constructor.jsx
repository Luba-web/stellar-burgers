import React, { useEffect, useState, useContext } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
//import reducer from "../../hooks/burger-constructor-reducer";
import { saveOrder } from "../../utils/api";
import BurgerIngredientsContext from "../../services/burger-ingredients-context";

const BurgerConstructor = () => {
  const ingredients = useContext(BurgerIngredientsContext);

  const [total, setTotal] = useState(0);
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false); //стейт для ордера

  const [modalData, setModalData] = useState(null);
  const res = [];

  const bunList = ingredients.find((a) => a.type === "bun");
  const ingredientsList = ingredients
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

  const arrIngredientsId = ingredients.map((element) => element._id);

  //создание массива без булочек
  ingredients.map((item) => {
    if (item.type !== "bun") res.push(item);
  });

  //посчет итоговой суммы
  useEffect(() => {
    const price = res.reduce(
      (sum, item) => sum + item.price,
      ingredients[0].price
    );
    setTotal(price);
  }, [ingredients]);

  const handleOrderClick = () => {
    saveOrder(arrIngredientsId)
      .then((data) => {
        setModalData(data);
        // открытие модального окна ордеров
        setOrderDetailsOpened(true);
      })
      .catch((err) => console.log(err));
  };

  // Закрытие модального окна
  const closeModals = () => {
    setOrderDetailsOpened(false);
  };

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
        <Button type="primary" onClick={handleOrderClick}>
          Оформить заказ
        </Button>
      </div>
      {isOrderDetailsOpened && (
        <Modal title="" onClose={closeModals}>
          <OrderDetails orderNumber={modalData.order.number} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
