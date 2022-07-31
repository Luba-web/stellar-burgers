import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const IngredientDetails = () => {
  const { id } = useParams();

  const { ingredients } = useSelector((state) => state.burgerIngredients);
  const cardIngredient = useSelector((state) => state.details.ingredientDetail);

  const categories = ["calories", "proteins", "fat", "carbohydrates"];

  let activeIngredient;
  if (id) {
    activeIngredient = ingredients.find((item) => item._id === id);
  } else {
    activeIngredient = cardIngredient;
  }

  const obj = {
    calories: "Калории,ккал",
    proteins: "Белки, г",
    fat: "Жиры, г",
    carbohydrates: "Углеводы, г",
  };

  return (
    <>
      <img
        src={activeIngredient?.image_large}
        alt={activeIngredient?.name}
      ></img>
      <h3 className={`${styles.title} text text_type_main-default mt-4 mb-8`}>
        {activeIngredient?.name}
      </h3>
      <ul className={`${styles.list} mb-15`}>
        {activeIngredient &&
          categories.map((item, index) => {
            if (item in activeIngredient) {
              return (
                <li className={`${styles.item} pr-5`} key={index}>
                  <p className="text text_type_main-default text_color_inactive">
                    {obj[item]}
                  </p>
                  <p className="text text_type_main-default text_color_inactive">
                    {activeIngredient[item]}
                  </p>
                </li>
              );
            }
          })}
      </ul>
    </>
  );
};

export default IngredientDetails;
