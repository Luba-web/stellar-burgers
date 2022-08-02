import React from "react";
import { useSelector } from "react-redux";

import HomePage from "../../components/home-page/home-page";
import styles from "./home.module.css";

const Home = () => {
  const { ingredientsRequest } = useSelector(
    (store) => store.burgerIngredients
  );

  return ingredientsRequest ? (
    <p
      className={`${styles.failed} text text_type_main-large text_color_inactive mt-15`}
    >
      Готовим ингридиенты... еще чуть чуть...
    </p>
  ) : (
    <HomePage />
  );
};

export default Home;
