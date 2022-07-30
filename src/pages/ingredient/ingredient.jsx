//страница ингредиента
import React from "react";
import styles from "./ingredient.module.css";
import IngredientDetails from "../../components/ingredient-details/ingredient-details";

const Ingredient = () => {
  return (
    <div className={styles.container}>
      <IngredientDetails />
    </div>
  );
};

export default Ingredient;
