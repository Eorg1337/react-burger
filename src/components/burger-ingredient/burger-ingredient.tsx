import { FC } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredient.module.css";
import { useDrag } from "react-dnd/dist/hooks";
import { IngredientType, TIngredient } from "../../utils/types/types";

type BurgerIngredientProps = TIngredient & {
  count: number;
  onClick: () => TIngredient;
  onDropHandler: () => void;
};

const BurgerIngredient: FC<BurgerIngredientProps> = (props) => {
  const [, dragRef] = useDrag(() => ({
    type: "ingredient",
    item: { ...props, onClick: undefined, onDropHandler: undefined },
  }));

  return (
    <div className={styles.ingredient} onClick={props.onClick} ref={dragRef}>
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

export default BurgerIngredient;
