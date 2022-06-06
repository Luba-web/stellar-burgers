import React, { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import getIngredientsDataServer from "../../utils/api";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {
  //стейт для Api
  const [ingredients, setIngredients] = useState({
    data: [],
    isLoading: false,
    hasError: false,
    errorMessage: "",
  });

  //Булевые стейты для конкретных модалок
  const [isIngredientsOpened, setIngredientsOpened] = useState(false); //стейт для ингридиента
  const [isOrderDetailsOpened, setOrderDetailsOpened] = useState(false); //стейт для ордера
  const [cardIngredient, setCardIngredient] = useState({}); //стейт для выбранной карточки

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

  //открытие модального окона ордеров
  const openOrderModal = () => setOrderDetailsOpened(true); //открыли модальное окно

  //открытие модального окона ингридиентов
  const openIngredientsModal = (item) => {
    setCardIngredient(item);
    setIngredientsOpened(true);
  };

  // Закрытие всех модалок
  const closeModals = () => {
    setOrderDetailsOpened(false);
    setIngredientsOpened(false);
  };

  return (
    <>
      <div className={styles.body}>
        <AppHeader />
        {ingredients.data.length > 0 && (
          <main className={styles.container}>
            <BurgerIngredients
              arrIngredients={ingredients.data}
              onClick={openIngredientsModal}
            />
            <BurgerConstructor
              arrIngredients={ingredients.data}
              onClick={openOrderModal}
            />
          </main>
        )}
        {isOrderDetailsOpened && (
          <Modal
            title=""
            onClose={closeModals}
          >
            <OrderDetails />
          </Modal>
        )}
        {isIngredientsOpened && (
          <Modal
            title="Детали ингредиента"
            onClose={closeModals}
          >
            <IngredientDetails data={cardIngredient} />
          </Modal>
        )}
      </div>
    </>
  );
}

export default App;
