import React, { FC } from "react";
import styles from "./order-details.module.css";
import ready from "../../images/ready.svg";
import { useSelector } from "../../services/hooks";

const OrderDetails: FC = () => {
  const { order } = useSelector((store) => store.order);

  return (
    <div className={styles.box}>
      <h3 className={`${styles.number} text text_type_digits-large mt-30`}>
        {!order ? (
          <p className="text text_type_main-default">
            Готовим номер заказа подаждите...
          </p>
        ) : (
          order
        )}
      </h3>
      <p className={`${styles.text} text text_type_main-medium mt-8 mb-15`}>
        идентификатор заказа
      </p>
      <img className={styles.icon} src={ready} alt="ready" />
      <p className={`${styles.text} text text_type_main-default mt-15 mb-2`}>
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
