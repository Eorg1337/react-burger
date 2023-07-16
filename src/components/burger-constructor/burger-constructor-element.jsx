import React,{useRef} from "react";
import {
    ConstructorElement,
    DragIcon
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import styles from "./burger-constructor.module.css";
  import { useDrop,useDrag } from 'react-dnd';
  import { useDispatch} from "react-redux";
  import { deleteIngredient, moveIngredient } from "../../services/constructor/reducer";

const BurgerConstructorElement = ({ingredient,index, unique_id}) => {
    const dispatch = useDispatch();
    const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ["SORT_INGREDIENT"],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }


      dispatch(moveIngredient({dragIndex,hoverIndex}));
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
        <div className={styles.constructor_item} key={index} data-handler-id={handlerId} ref={ref}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            unique_id={unique_id}
            handleClose={() =>
              dispatch(deleteIngredient(unique_id))
            }
          />
        </div>
      );
}

export default BurgerConstructorElement