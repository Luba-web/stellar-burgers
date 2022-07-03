import React, { useMemo } from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredients-category.module.css";
import PropTypes from 'prop-types';

import { useSelector } from "react-redux";

function IngredientsCategory({ type, onClick }) {

  const { ingredients } = useSelector(state => state.burgerIngredients);
  const { bun, ingredientsConstructor } = useSelector((state) => state.dnd);

  //const [count, setCount] = useState(1);
  
  const counter = useMemo(() =>
  (count = 0) => {
     for (let { _id } of ingredientsConstructor)
        if (_id === ingredients._id) count++

     if (bun && bun._id === ingredients._id)
        return 2
     return count
  }, [bun, ingredientsConstructor, ingredients._id])
  
  const objTabName = {
    'bun': 'Булки',
    'sauce': 'Соусы',
    'main': 'Начинки'
  }

  return (
    <section className="mb-5">
      <h2 className="text text_type_main-medium pt-10">{objTabName[type]}</h2>
      <ul className={`${styles.list}`}>
        {ingredients
          .filter((item) => item.type === type)
          .map((elem) => (
            <li className={`${styles.item} mt-6 ml-4 mr-6`} key={elem._id} onClick={() => onClick(elem)}>
              <img src={elem.image} alt={elem.name} />
              <div className={`${styles.priceTitle} pt-1 pb-1`}>
                <p className="text text_type_digits-default mr-2">
                  {elem.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
              <p className="text text_type_main-default">{elem.name}</p>
              <div className={`${styles.count}`}>
                {counter() < 0 &&
                  <Counter count={counter()} size="default" />
                }
              </div>
            </li>
          ))}
      </ul>
    </section>
  )
}

IngredientsCategory.propTypes = {
  type: PropTypes.string.isRequired,
  onclick: PropTypes.func
}

export default IngredientsCategory;