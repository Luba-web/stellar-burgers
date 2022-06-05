import React from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredients-category.module.css";
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../utils/prop-types'

function IngredientsCategory({ element, type, onClick }) {
  const objTabName = {
    'bun': 'Булки',
    'sauce': 'Соусы',
    'main': 'Начинки'
  }
  
  return (
    <section className="mb-5">
      <h2 className="text text_type_main-medium pt-10">{objTabName[type]}</h2>
      <ul className={`${styles.list}`}>
        {element
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
                <Counter count={1} size="default" />
              </div>
            </li>
          ))}
      </ul>
    </section>
  )
}

IngredientsCategory.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
  type: PropTypes.string.isRequired,
  onclick: PropTypes.func.isRequired

}

export default IngredientsCategory;