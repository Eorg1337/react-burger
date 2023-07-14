import React from "react";
import { useMemo } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import MyModal from "../modal/modal";
import OrderDetails from "../details/order-details/order-details";
import { TotalPrice } from "./total-price";
import { useDispatch,useSelector } from "react-redux";
import { createOrder } from "../../services/actions";
import { useDrop,useDrag } from 'react-dnd';
import { deleteIngredient, moveIngredient } from "../../services/constructor/reducer";

const BurgerConstructor = () => {
  const [isActive, setIsActive] = React.useState(false);
  const dispatch = useDispatch();
  const ref = React.useRef(null);
  const ingredients = useSelector(state => state.rootReducer.constr?.constructorIngredients)
  const id = useSelector(state=>state.rootReducer.constr?.id)
  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: "ingredient",
    item: id
  })
  const index = useMemo(() => ingredients?.findIndex(item => item === ref.current), [ingredients]);
  console.log(index)
  const [{ handlerId }, drop] = useDrop({
    accept: "ingredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: "ingredient",
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const moveCard = (dragIndex, hoverIndex) =>{
    dispatch(moveIngredient(dragIndex, hoverIndex))
  }
  

  const handleDeleteIngredient = (unique_id) => {
    dispatch(deleteIngredient(unique_id))
  }

  const createOrderHandler = (ids) => {
    dispatch(createOrder(ids))
  }

  const handleBtnClick = (ids) => {
    setIsActive(true);
    createOrderHandler(ids);
  };

  const handleCloseModal = () => {
    setIsActive(false);
  };

  
  


  const filteredBuns = useMemo(() => ingredients?.find((item,index) => item.type === "bun"),[ingredients]);
  const filteredIngr = useMemo(() => ingredients?.filter((item,index) => item.type !== "bun"),[ingredients]);
  const AllIngr =
    filteredBuns && filteredIngr
      ? filteredIngr.concat(filteredBuns, filteredBuns)
      : [];
  const ids = useMemo(() => AllIngr
    ? Array.from(AllIngr).map((item) => item.id)
    : null, [AllIngr]);
    
    drag(drop(ref))
  return (
    <div className={styles.container}>
        <div className={styles.constructor__cont} ref={dropRef}>
          <div className={styles.top_bun}>
            {filteredBuns && (
              <ConstructorElement
                _id={filteredBuns._id}
                moveCard={moveCard}
                type="top"
                isLocked={true}
                text={`${filteredBuns.name} (верх)`}
                price={filteredBuns.price}
                thumbnail={filteredBuns.image}
              />
            )}
          </div>
          <div className={styles.choice} ref = {drop}>
            {filteredIngr &&
              filteredIngr.map((item,index) => (
                <div className={styles.constructor_item} key={index} ref={ref} data-handler-id={handlerId}>
                  <DragIcon type="primary"/>
                  <ConstructorElement
                    _id={item._id}
                    type={item.type}
                    isLocked={false}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    moveCard={moveCard}
                    handleClose={(()=>handleDeleteIngredient(item.unique_id))}
                  />
                </div>
              ))}
          </div>
          <div className={styles.low_bun}>
            {filteredBuns && (
              <ConstructorElement
                _id={filteredBuns._id}
                type="bottom"
                isLocked={true}
                text={`${filteredBuns.name} (низ)`}
                price={filteredBuns.price}
                thumbnail={filteredBuns.image}
              />
            )}
          </div>
        </div>
        <div className={styles.total}>
          <div className={styles.cost}>
            <p className="text text_type_digits-medium mr-2">
              {filteredBuns && filteredIngr && 
              <TotalPrice
                filteredBuns={filteredBuns}
                filteredIngr={filteredIngr}
              />}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          {isActive && ids && (
            <MyModal onClose={handleCloseModal}>
              <OrderDetails ids={ids} />
            </MyModal>
          )}
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={()=>handleBtnClick(ids)}
          >
            Оформить заказ
          </Button>
        </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  state: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default BurgerConstructor;
