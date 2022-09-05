import React, { useEffect, useState, FC } from "react";
import { useDispatch, useSelector } from "../../services/hooks";

import styles from "./feed-page.module.css";

import OrderCard from "../order-card/order-card";

import {
  WS_CLEAR_STORE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_INIT,
} from "../../services/actions/ws-action";

const StatusList: FC = () => {
  const { orders, total, totalToday } = useSelector((store) => store.ws);

  //ограничения показываемый заказов в статусе готово
  const numberIsDone = orders ? orders
    .filter((order) => order.status === "done")
    .slice(0, 10) : [];

  //ограничения показываемый заказов в статусе готовиться
  const numberIsPending = orders ? orders
    .filter((order) => order.status === "pending")
    .slice(0, 10) : [];

  return (
    <div>
      <div className={styles.status_container}>
        <div className={styles.orders}>
          <h3 className="text text_type_main-medium mb-3">Готовы:</h3>
          <ul className={styles.status_number}>
            {numberIsDone.map((item) => (
              <li
                className={`${styles.done} text text_type_digits-default`}
                key={item._id}
              >
                {item.number}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.orders}>
          <h3 className="text text_type_main-medium mb-3">В работе:</h3>
          <ul className={styles.status_number}>
            {numberIsPending.map((item) => (
              <li
                className={`${styles.pending} text text_type_digits-default`}
                key={item._id}
              >
                {item.number}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text text_type_main-medium mt-6">Выполнено за все время:</p>
      <p className="text text_type_digits-large">{total}</p>
      <p className="text text_type_main-medium mt-6">Выполнено за сегодня:</p>
      <p className="text text_type_digits-large">{totalToday}</p>
    </div>
  );
};

const FeedPage: FC = () => {
  const dispatch = useDispatch();
  const [, setFeedModal] = useState(false);

  const { orders } = useSelector((store) => store.ws);

  //запускаем ws
  useEffect(() => {
    if (!orders) {
      dispatch({
        type: WS_CONNECTION_INIT,
        payload: "/all",
      });

      return () => {
        dispatch({ type: WS_CONNECTION_CLOSED });
      };
    }
  }, [dispatch, orders]);

  //очистка ws
  useEffect(() => {
    dispatch({ type: WS_CLEAR_STORE });
  }, [dispatch]);

  //открытие модального окна
  const handleFeedModal = () => {
    setFeedModal(true);
  };

  return (
    orders && (
      <div className={styles.block}>
        <h2 className="text text_type_main-large pt-8 pb-4">Лента заказов</h2>
        <section className={styles.container}>
          <ul className={styles.list}>
            {orders.map((item) => (
              <OrderCard
                onOpen={handleFeedModal}
                item={item}
                key={item._id}
                url={"feed"}
                status={item.status}
                arr={item.ingredients}
              />
            ))}
          </ul>
          <StatusList />
        </section>
      </div>
    )
  );
};

export default FeedPage;
