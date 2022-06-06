import React from "react";
import {useState, useEffect} from 'react';
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../utils/prop-types'
import IngredientsCategory from "../ingredients-category/ingredients-category";

const BurgerIngredients = ({ arrIngredients, onClick }) => {
  const [current, setCurrent] = useState('bun');
  
  return (
    <section className="mt-10 mr-10">
      <h2 className="text text_type_main-large pb-5">Соберите бургер</h2>
      <nav style={{ display: 'flex' }}>
          <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>
              Булки
          </Tab>
          <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>
              Соусы
          </Tab>
          <Tab value='main' active={current === 'main'} onClick={setCurrent}>
              Начинки
          </Tab>
      </nav>
      <div className={styles.block}>
        <IngredientsCategory element={arrIngredients} type="bun" onClick={onClick} />
        <IngredientsCategory
          element={arrIngredients}
          type="sauce"
          onClick={onClick}
        />
        <IngredientsCategory
          element={arrIngredients}
          type="main"
          onClick={onClick}
        />
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  arrIngredients: PropTypes.arrayOf(ingredientPropType).isRequired,

}

export default BurgerIngredients;
