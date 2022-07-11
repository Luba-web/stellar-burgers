import React, { useEffect } from "react";
import styles from "./app.module.css";

import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import { getIngredients } from "../../services/actions/ingredients.js";

import { useDispatch, useSelector } from "react-redux";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();

  const { ingredientsRequest } = useSelector(
    (state) => state.burgerIngredients
  );

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <div className={styles.body}>
        <AppHeader />

        {ingredientsRequest ? (
          <>
            <p
              className={`${styles.failed} text text_type_main-large text_color_inactive mt-15`}
            >
              Готовим ингридиенты... еще чуть чуть...
            </p>
          </>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <main className={styles.container}>
              <BurgerIngredients />
              <BurgerConstructor />
            </main>
          </DndProvider>
        )}
      </div>
    </>
  );
}

export default App;
