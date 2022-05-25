import React from 'react';
import styles from './app-header.module.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.header__nav}>
        <ul className={styles.header__ul}>
          <li className={styles.header__li}>
            <a href="#" className={styles.header__link}>
              <BurgerIcon type="primary" className={styles.header__icon} />
              <p className={styles.header__text}>
                Конструктор
              </p>
            </a>
          </li>
          <li className={styles.header__li}>
            <a href="#" className={styles.header__link}>
              <ListIcon type="primary" className={styles.header__icon} />
              <p className={styles.header__text}>
                Лента заказов
              </p>
            </a>
          </li>
        </ul>
      </nav>
      <button className={styles.header__btn}>
        <ProfileIcon type="primary" className={styles.header__icon} />
        <p className={styles.header__text}>
          Личный кабинет
        </p>
      </button>
      <div className={styles.logo}><Logo /></div>
    </header>
  );
}

export default AppHeader;
