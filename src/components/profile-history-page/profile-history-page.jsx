import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderCard from "../order-card/order-card";

import ProfileMenu from "../profile-menu/profile-menu";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_INIT,
} from "../../services/actions/ws-action";

import { getCookie } from "../../utils/cookie";

import styles from "./profile-history-page.module.css";

const ProfileHistoryPage = () => {
  const [historyModal, setHistoryModal] = useState(false);

  const orders = useSelector((store) => store.ws.orders || undefined);
  const dispatch = useDispatch();

  //запускаем ws
  useEffect(() => {
    if (!orders) {
      dispatch({
        type: WS_CONNECTION_INIT,
        payload: `?token=${getCookie("token")}`,
      });

      return () => {
        dispatch({ type: WS_CONNECTION_CLOSED });
      };
    }
  }, [dispatch, orders]);

  //открытие модального окна
  const handleHistoryModal = () => {
    setHistoryModal(true);
  };

  return (
    <div className={styles.container}>
      <ProfileMenu />
      <div className={styles.block}>
        <ul className={styles.list}>
          {!orders ? (
            <p
              className={`${styles.failed} text text_type_main-large text_color_inactive mt-15`}
            >
              Загрузка истории, еще чуть чуть...
            </p>
          ) : (
            orders?.map((item) => (
              <OrderCard
                onOpen={handleHistoryModal}
                item={item}
                key={item._id}
                arr={item.ingredients}
                url={"profile/orders"}
                status={item.status}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfileHistoryPage;
