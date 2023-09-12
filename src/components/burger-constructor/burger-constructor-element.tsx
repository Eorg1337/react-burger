import { useRef, FC } from "react";
import type { Identifier } from "dnd-core";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { useDrop, useDrag } from "react-dnd";
import { useDispatch } from "../../services/store";
import {
  deleteIngredient,
  moveIngredient,
} from "../../services/constructor/reducer";
import { TIngredient } from "../../utils/types/types";

type BurgerConstructorElementProps = {
  ingredient: TIngredient;
  index?: number;
  onDrop?: (dragIndex: number, hoverIndex: number) => void;
  unique_id: string;
  deleteIngredient: (unique_id: string) => void;
};

type DragElem = TIngredient & {
  index: number;
};

const BurgerConstructorElement: FC<BurgerConstructorElementProps> = ({
  ingredient,
  index,
  unique_id,
}) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragElem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ["SORT_INGREDIENT"],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index ?? 0;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = hoverBoundingRect
        ? (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        : 0;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY =
        clientOffset && hoverBoundingRect
          ? clientOffset.y - hoverBoundingRect.top
          : 0;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(moveIngredient({ dragIndex, hoverIndex }));
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "SORT_INGREDIENT",
    item: () => {
      return { ingredient, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      className={styles.constructor_item}
      data-handler-id={handlerId}
      ref={ref}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => dispatch(deleteIngredient(unique_id))}
      />
    </div>
  );
};

export default BurgerConstructorElement;
