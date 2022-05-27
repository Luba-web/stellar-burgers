import React from 'react';
import styles from './burger-constructor.module.css'
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {useEffect, useState} from 'react';
//import PropTypes from 'prop-types';

const BurgerConstructor = ({arrIngredients}) => {
  const [total, setTotal] = useState(0);
  const res = [];
  
  arrIngredients.map((item) => {
      if (item.type !== 'bun') res.push(item)
  })
  
  useEffect(() => {
      const price = res.reduce((sum, item) => sum + item.price, arrIngredients[0].price)
      setTotal(price)
  }, [arrIngredients])

  return (

    <section className={`${styles.contener} mt-25 `}>
      <div className={styles.block}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${arrIngredients[0].name} (верх)`}
            price={200}
            thumbnail={arrIngredients[0].image}  
          />
        <ul className={styles.list}>
          {arrIngredients.filter((item) => item.type !== 'bun')
            .map((element, index) => (
              <li className={styles.item} key={index}>
                <DragIcon/>
                <ConstructorElement
                  text={element.name}
                  price={element.price}
                  thumbnail={element.image}
                />
              </li>
            ))
          }
        </ul>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${arrIngredients[0].name} (низ)`}
            price={200}
            thumbnail={arrIngredients[0].image}
          />
      </div>
      <div className={`${styles.priceSum} pt-10`}>
        <div className={`${styles.priceSum} `}>
          <p><span className="text text_type_digits-medium pr-2">610</span></p>
          <CurrencyIcon type="primary"/>
        </div>
        <Button type="primary">Оформить заказ</Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;