import React from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredients-constructor.module.css";

import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { useDrop, useDrag } from "react-dnd";

import { DELETE_ELEMENT } from "../../services/actions/dnd";
import { MOVE_CONSTRUCTOR_ELEMENT } from "../../services/actions/dnd";

const IngredientsConstructor = ({ id, index, element }) => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  //сортировка ингредиентов внутри конструктора
  const [, drop] = useDrop({
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

  const deleteElem = (id) => {
    dispatch({
      type: DELETE_ELEMENT,
      id: id,
    });
  };

  return (
    <li className={styles.element} index={index} style={{ opacity }} ref={ref}>
      <DragIcon />
      <ConstructorElement
        text={element.name}
        price={element.price}
        thumbnail={element.image}
        handleClose={() => deleteElem(id)}
      />
    </li>
  );
};

IngredientsConstructor.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default IngredientsConstructor;
