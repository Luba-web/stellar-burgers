import React from "react";
import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { Link, NavLink, useLocation } from "react-router-dom";

function AppHeader() {
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <ul className={styles.header__ul}>
          <li className={`${styles.header__li} pt-4 pb-4`}>
            <NavLink to="/" className={styles.header__link} exact>
              <BurgerIcon type="primary" />
              <p className="pl-2 text text_type_main-default">Конструктор</p>
            </NavLink>
          </li>
          <li className={`${styles.header__li} pt-4 pb-4`}>
            <NavLink to="/order-list" className={styles.header__link}>
              <ListIcon type="secondary" />
              <p className="pl-2 text text_type_main-default text_color_inactive">
                Лента заказов
              </p>
            </NavLink>
          </li>
        </ul>

        <div className={styles.logo}>
          {pathname === "/" ? (
            <Logo />
          ) : (
            <Link to="/">
              <Logo />
            </Link>
          )}
        </div>

        <NavLink to="/profile" className={`${styles.header__btn} mr-10`}>
          <ProfileIcon type="secondary" />
          <p className="pl-2 text text_type_main-default text_color_inactive">
            Личный кабинет
          </p>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
