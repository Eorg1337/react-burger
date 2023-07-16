import React from "react";
import {
    ConstructorElement,
    DragIcon
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import styles from "./burger-constructor.module.css";
  import { useDrop,useDrag } from 'react-dnd';
  import { useDispatch, useSelector } from "react-redux";
  import { moveIngredient } from "../../services/constructor/reducer";

const BurgerConstructorElement = (props, handleClose, index) => {
    const ref = React.useRef(null);
    const dispatch = useDispatch();
    const id = useSelector(state=>state.rootReducer.constr?.id)
    const elemIndex = props.index
    const [{ handlerId }, drop] = useDrop({
        accept: "sorting",
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(),
          }
        },
        hover(item, monitor) {
          if (!ref.current) {
            return
          }
          const dragIndex = item.elemIndex
          const hoverIndex = elemIndex
          if (dragIndex === hoverIndex) {
            console.log("dragIndex:" ,dragIndex, "hoverIndex:",hoverIndex)
            return
          }
          const hoverBoundingRect = ref.current?.getBoundingClientRect()
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
          const clientOffset = monitor.getClientOffset()
          const hoverClientY = clientOffset.y - hoverBoundingRect.top
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            console.log("true dragIndex < hoverIndex ")
            return
          }
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            console.log("true dragIndex > hoverIndex")
            return
          }
          dispatch(moveIngredient(dragIndex, hoverIndex))
          item.elemIndex = hoverIndex
          console.log(item.elemIndex)
        },
      })
      const [{ isDragging }, drag] = useDrag({
        type: "sorting",
        item: () => {
          return { id, elemIndex }
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      })
      const opacity = isDragging ? 0 : 1
      drag(drop(ref))
    return (
        <div className={styles.constructor_item} key={index} data-handler-id={handlerId} ref={ref}>
          <DragIcon type="primary" />
          <ConstructorElement
            index={props.index}
            id={props.id}
            type={props.type}
            isLocked={false}
            text={props.text}
            price={props.price}
            thumbnail={props.thumbnail}
            moveIngredient={() => moveIngredient()}
            handleClose={handleClose}
          />
        </div>
      );
}

export default BurgerConstructorElement