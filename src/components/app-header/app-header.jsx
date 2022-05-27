import React from 'react';
import styles from './app-header.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <ul className={styles.header__ul}>
          <li className={`${styles.header__li} pt-4 pb-4`}>
            <a href={"#"} className={styles.header__link}>
              <BurgerIcon type="primary" />
              <p className="pl-2 text text_type_main-default">
                Конструктор
              </p>
            </a>
          </li>
          <li className={`${styles.header__li} pt-4 pb-4`}>
            <a href={"#"} className={styles.header__link}>
              <ListIcon type="secondary"/>
              <p className="pl-2 text text_type_main-default text_color_inactive">
                Лента заказов
              </p>
            </a>
          </li>
        </ul>
      
      <div className={styles.logo}><Logo /></div>
      <button className={styles.header__btn}>
        <ProfileIcon type="secondary"/>
        <p className="pl-2 text text_type_main-default text_color_inactive">
          Личный кабинет
        </p>
      </button>
      </nav>
    </header>
  );
}

export default AppHeader;
