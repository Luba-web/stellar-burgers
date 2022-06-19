import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";

const IngredientDetails = ({ cardIngredient }) => {
  const categories = ["calories", "proteins", "fat", "carbohydrates"];

  const obj = {
    calories: "Калории,ккал",
    proteins: "Белки, г",
    fat: "Жиры, г",
    carbohydrates: "Углеводы, г",
  };

  return (
    <>
      <img src={cardIngredient.image_large} alt={cardIngredient.name}></img>
      <h3 className={`${styles.title} text text_type_main-default mt-4 mb-8`}>
        {cardIngredient.name}
      </h3>
      <ul className={`${styles.list} mb-15`}>
        {categories.map((item, index) => {
          if (item in cardIngredient) {
            return (
              <li className={`${styles.item} pr-5`} key={index}>
                <p className="text text_type_main-default text_color_inactive">
                  {obj[item]}
                </p>
                <p className="text text_type_main-default text_color_inactive">
                  {cardIngredient[item]}
                </p>
              </li>
            );
          }
        })}
      </ul>
    </>
  );
};

IngredientDetails.propTypes = {
  cardIngredient: PropTypes.object.isRequired,
};

export default IngredientDetails;
