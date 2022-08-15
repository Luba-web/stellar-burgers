//страница информации по карточке
import React, { useEffect } from "react";
import styles from "./order-info.module.css";
import OrderInfoPage from "../../components/order-info-page/order-info-page";
import { useDispatch, useSelector } from "react-redux";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_INIT,
} from "../../services/actions/ws-action";
import PropTypes from "prop-types";

const OrderInfo = ({ url }) => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.ws);

  //запускаем ws
  useEffect(() => {
    if (!orders) {
      dispatch({
        type: WS_CONNECTION_INIT,
        payload: url,
      });

      return () => {
        dispatch({ type: WS_CONNECTION_CLOSED });
      };
    }
  }, [dispatch, orders, url]);

  return (
    <div className={styles.container}>
      <OrderInfoPage />
    </div>
  );
};

export default OrderInfo;

OrderInfo.propTypes = {
  url: PropTypes.string,
};
