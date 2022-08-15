import React from "react";
import styles from "./profile-menu.module.css";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postLogout } from "../../services/actions/user";

const ProfileMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handlerLogout = () => {
    dispatch(postLogout());
    history.replace({
      pathname: "/",
      state: {
        from: {
          pathname: "/",
        },
      },
    });
  };

  const location = useLocation();

  const styleProfile =
    location.pathname === "/profile" ? styles.link__active : "";
  const styleHistoryOrders =
    location.pathname === "/profile/orders" ? styles.link__active : "";

  return (
    <nav className={styles.nav}>
      <li>
        <NavLink
          to={`/profile`}
          exact
          className={`${styles.link} ${styleProfile} text text_type_main-medium`}
        >
          Профиль
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`/profile/orders`}
          exact
          className={`${styles.link} ${styleHistoryOrders} text text_type_main-medium`}
        >
          История заказов
        </NavLink>
      </li>
      <li>
        <p
          className={`${styles.link} text text_type_main-medium text_color_inactive`}
          onClick={handlerLogout}
        >
          Выход
        </p>
      </li>
      <p
        className={`${styles.text} text text_type_main-small text_color_inactive mt-20`}
      >
        В этом разделе вы можете изменить&nbsp;свои персональные данные
      </p>
    </nav>
  );
};

export default ProfileMenu;
