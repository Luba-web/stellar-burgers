import React from 'react';
//import {useState} from 'react';
import styles from './burger-ingredients.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
//import PropTypes from 'prop-types';

// function MenuTabs() {
//   const [current, setCurrent] = useState('bun')
//   return (
//       <nav style={{ display: 'flex' }}>
//           <Tab value='bun' active={current === 'bun'} onClick={setCurrent}>
//               Булки
//           </Tab>
//           <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent}>
//               Соусы
//           </Tab>
//           <Tab value='main' active={current === 'main'} onClick={setCurrent}>
//               Начинки
//           </Tab>
//       </nav>
//   )
// }

function IngridientsElement({element, type, title}) {

  return (
    <section>
      <h2 className="text text_type_main-large pt-10">{title}</h2>

      <ul className={`${styles.list}`}>
        {element.filter((item) => item.type === type)
          .map((elem) => (
            <li className={`${styles.item} mt-6 ml-4 mr-6`} key={elem._id}>
              <img src={elem.image} alt={elem.name}/>
              <div className={`${styles.priceTitle} pt-1 pb-1`}>
                <p className="text text_type_digits-default mr-2">{elem.price}</p>
                <CurrencyIcon />
              </div>
              <p className="text text_type_main-default">{elem.name}</p>
            </li>
          ))
        }
      </ul>
    </section>
  )
}

const BurgerIngredients = ({ arrIngredients }) => {

  return (
    
    <section className='mt-10 mr-10'>
      <h2 className='text text_type_main-large pb-5'>Соберите бургер
      </h2>
      
      <div className={styles.block}>
        <IngridientsElement element={arrIngredients} type='bun' title='Булки'/>
        <IngridientsElement element={arrIngredients} type='sauce' title='Соусы'/>
        <IngridientsElement element={arrIngredients} type='main' title='Начинки'/>
      </div>
    </section>
  )
}


export default BurgerIngredients;