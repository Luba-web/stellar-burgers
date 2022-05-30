import React from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../utils/prop-types'

const BurgerConstructor = ({ arrIngredients }) => {

  const ingredientsList = arrIngredients
    .filter((item) => item.type !== "bun")
    .map((element, index) => (
      <li className={styles.item} key={index}>
        <DragIcon />
        <ConstructorElement
          text={element.name}
          price={element.price}
          thumbnail={element.image}
        />
      </li>
    ))
  
  return (
    <section className={`${styles.container} mt-25 `}>
      <div className={styles.blockBun}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${arrIngredients[0].name} (верх)`}
          price={200}
          thumbnail={arrIngredients[0].image}
        />
      </div>
      <div className={`${styles.block} mt-4`}>
        <ul className={styles.list}>
          {ingredientsList}
        </ul>
      </div>
      <div className={styles.blockBun}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${arrIngredients[0].name} (низ)`}
          price={200}
          thumbnail={arrIngredients[0].image}
        />
      </div>
      <div className={`${styles.priceBox} pt-10`}>
        <div className={`${styles.priceStyle} `}>
          <p>
            <span className="text text_type_digits-medium pr-2">610</span>
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary">Оформить заказ</Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  arrIngredients: PropTypes.arrayOf(ingredientPropType).isRequired
}

export default BurgerConstructor;
