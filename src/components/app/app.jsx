import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredientsDataServer } from "../../utils/api";
import BurgerIngredientsContext from "../../services/burger-ingredients-context";

function App() {
  //стейт для Api
  const [ingredients, setIngredients] = useState({
    data: [],
    isLoading: false,
    hasError: false,
    errorMessage: "",
  });

  //Api запрос
  const getIngredientsData = () => {
    setIngredients({
      ...ingredients,
      isLoading: true,
      hasError: false,
    });

    getIngredientsDataServer()
      .then((res) =>
        setIngredients({
          ...ingredients,
          data: res.data,
          isLoading: false,
        })
      )

      .catch((err) =>
        setIngredients({
          ...ingredients,
          isLoading: false,
          hasError: true,
          errorMessage: err.message,
        })
      );
  };

  useEffect(getIngredientsData, []);

  return (
    <>
      <div className={styles.body}>
        <AppHeader />
        <BurgerIngredientsContext.Provider value={ingredients.data}>
          {/* проверка есть ли массив */}
          {ingredients.data.length > 0 && (
            <main className={styles.container}>
              <BurgerIngredients />
              <BurgerConstructor />
            </main>
          )}
        </BurgerIngredientsContext.Provider>
      </div>
    </>
  );
}

export default App;
