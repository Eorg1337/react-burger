import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import PropTypes from "prop-types";
import { useDrag } from "react-dnd/dist/hooks";

const BurgerIngredient = (props) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "ingredient",
    item: props,
  }));

  return (
    <div
      type={props.type}
      className={styles.ingredient}
      onClick={props.onClick}
      ref={dragRef}
    >
      {props.count > 0 && (
        <Counter count={props.count} size="default" extraClass="m-1" />
      )}
      <img src={props.image} alt="" className={styles.img}></img>
      <div className={styles.price}>
        <strong className="text text_type_digits-default mr-2 mt-1 mb-2">
          {props.price}
        </strong>
        <CurrencyIcon type="primary" />
      </div>
      <p className={styles.ingredientName}>{props.name}</p>
    </div>
  );
};
BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  __v: PropTypes.number,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default BurgerIngredient;
