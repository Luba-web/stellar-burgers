import React from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { data } from "../../utils/data";

function App() {
  return (
    <div className={styles.body}>
      <AppHeader />
      <main className={styles.contener}>
        <BurgerIngredients arrIngredients={data} />
        <BurgerConstructor arrIngredients={data} />
      </main>
    </div>
  );
}

export default App;
