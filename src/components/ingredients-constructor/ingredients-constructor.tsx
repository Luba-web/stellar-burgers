import React, { FC } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredients-constructor.module.css";

import { useDispatch } from "../../services/hooks";
import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";

import { DELETE_ELEMENT } from "../../services/actions/dnd";
import { MOVE_CONSTRUCTOR_ELEMENT } from "../../services/actions/dnd";
import { TIngredient } from "../../services/types/data";

interface IIngredientsConstructor {
  id: number;
  index: number;
  element: TIngredient;
}

type TDragElement = {
  index: number
}

const IngredientsConstructor: FC<IIngredientsConstructor> = ({ id, index, element }) => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  //сортировка ингредиентов внутри конструктора
  const [, drop] = useDrop<TDragElement>({
    accept: "item",
    hover(element) {
      if (!ref.current) {
        return;
      }
      const dragIndex = element.index;
      const hoverIndex = index;
      dispatch({
        type: MOVE_CONSTRUCTOR_ELEMENT,
        data: { dragIndex, hoverIndex },
      });
      element.index = hoverIndex;
    },
  });

  const [{ opacity }, drag] = useDrag({
    type: "item",
    item: { id, index },
    collect: (monitor) => {
      return {
        opacity: monitor.isDragging() ? 0.5 : 1,
      };
    },
  });

  drag(drop(ref));

  const deleteElem = (id: number) => {
    dispatch({
      type: DELETE_ELEMENT,
      id: id,
    });
  };

  return (
    <li className={styles.element} key={index} style={{ opacity }} ref={ref}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={element.name}
        price={element.price}
        thumbnail={element.image}
        handleClose={() => deleteElem(id)}
      />
    </li>
  );
};

export default IngredientsConstructor;
