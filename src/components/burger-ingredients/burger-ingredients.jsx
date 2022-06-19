import React from "react";
import { useState, useContext } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import BurgerIngredientsContext from "../../services/burger-ingredients-context";

const BurgerIngredients = () => {
  const ingredients = useContext(BurgerIngredientsContext); //контекст из App

  const [current, setCurrent] = useState("bun"); //стейт для категорий
  const [isIngredientsOpened, setIngredientsOpened] = useState(false); //стейт для ингридиента
  const [cardIngredient, setCardIngredient] = useState({}); //стейт для выбранной карточки

  //прокрутка на категорию
  const scroll = (id) => {
    setCurrent(id);
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  //открытие модального окона ингридиентов
  const openIngredientsModal = (item) => {
    setCardIngredient(item);
    setIngredientsOpened(true);
  };

  // Закрытие модального окна
  const closeModals = () => {
    setIngredientsOpened(false);
  };

  return (
    <section className="mt-10 mr-10">
      <h2 className="text text_type_main-large pb-5">Соберите бургер</h2>
      <nav className={styles.navIngredients}>
        <Tab
          value="bun"
          active={current === "bun"}
          onClick={() => scroll("bun")}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={() => scroll("sauce")}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={() => scroll("main")}
        >
          Начинки
        </Tab>
      </nav>
      <div className={styles.block}>
        <div id={"bun"}>
          <IngredientsCategory
            element={ingredients}
            type="bun"
            onClick={openIngredientsModal}
          />
        </div>
        <div id={"sauce"}>
          <IngredientsCategory
            element={ingredients}
            type="sauce"
            onClick={openIngredientsModal}
          />
        </div>
        <div id={"main"}>
          <IngredientsCategory
            element={ingredients}
            type="main"
            onClick={openIngredientsModal}
          />
        </div>
      </div>
      {isIngredientsOpened && (
        <Modal title="Детали ингредиента" onClose={closeModals}>
          <IngredientDetails cardIngredient={cardIngredient} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerIngredients;
