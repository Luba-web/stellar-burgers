import React from "react";
import { useState, useEffect } from "react";
import styles from "./burger-ingredients.module.css";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientsCategory from "../ingredients-category/ingredients-category";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

import { useSelector, useDispatch } from "react-redux";
import { INGREDIENT_DETAILS, DETAILS_REMOVE } from "../../services/actions/details";
import { useInView } from "react-hook-inview";

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const { ingredients } = useSelector(state => state.burgerIngredients);

  const [current, setCurrent] = useState("bun"); //стейт для категорий
  const [isIngredientsOpened, setIngredientsOpened] = useState(false); //стейт для ингридиента

  //прокрутка на категорию
  const [bunsRef, inViewBuns] = useInView(
    { threshold: 0.1, trackVisibility: true, delay: 150 })
  const [saucesRef, inViewSauces] = useInView(
    { threshold: 0.1, trackVisibility: true, delay: 150 })
  const [mainsRef, inViewMains] = useInView(
    { threshold: 0.1, trackVisibility: true, delay: 150 })

 useEffect(() => {
    if (inViewBuns) {
       setCurrent("bun")
    } else if (inViewSauces) {
       setCurrent("sauce")
    } else if (inViewMains) {
       setCurrent("main")
    }
 }, [inViewBuns, inViewSauces, inViewMains])

  const scroll = (id) => {
    setCurrent(id);
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  //открытие модального окона ингридиентов
  const openIngredientsModal = (ingredient) => {
    dispatch({
      type: INGREDIENT_DETAILS,
      data: ingredient
    });
    setIngredientsOpened(true);
  };

  // Закрытие модального окна
  const closeModals = () => {
    setIngredientsOpened(false);
    dispatch({ type: DETAILS_REMOVE });
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
      {ingredients !== undefined ? (
      <>
      <div className={styles.block}>
        <div id={"bun"} ref={bunsRef}>
          <IngredientsCategory
            type="bun"
            onClick={openIngredientsModal}
          />
        </div>
        <div id={"sauce"} ref={saucesRef}>
          <IngredientsCategory
            type="sauce"
            onClick={openIngredientsModal}
          />
        </div>
        <div id={"main"} ref={mainsRef}>
          <IngredientsCategory
            type="main"
            onClick={openIngredientsModal}
          />
        </div>
      </div>
    </>) : ( <>
        <p className={'text text_type_main-large text_color_inactive mt-15'}>Ингредиенты пока не загрузили...</p> </>
      )}
      {isIngredientsOpened && (
        <Modal title="Детали ингредиента" onClose={closeModals}>
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
};

export default BurgerIngredients;
