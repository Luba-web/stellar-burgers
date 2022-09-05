//домашняя страница
import React, { FC } from "react";
import styles from "./home-page.module.css";

import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const HomePage: FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.container}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </DndProvider>
  );
};

export default HomePage;
