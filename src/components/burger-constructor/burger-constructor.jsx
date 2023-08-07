import React from "react";
import { useMemo, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../services/order/actions";
import { useDrop } from "react-dnd";
import {
  addIngredient,
  deleteIngredient,
} from "../../services/constructor/reducer";
import BurgerConstructorElement from "./burger-constructor-element";
import { useNavigate } from "react-router-dom";

const BurgerConstructor = () => {
  const [isActive, setIsActive] = React.useState(false);
  const dispatch = useDispatch();
  const ref = React.useRef(null);

  const ingredients = useSelector(
    (state) => state.rootReducer.constr?.constructorIngredients,
  );
  const buns = useSelector(
    (state) => state.rootReducer.constr?.constructorBuns,
  );
  const userAuth = useSelector((state) => state.rootReducer.user?.user.name);

  const id = useSelector((state) => state.rootReducer.constr?.id);
  const [{ canDrop, dragItem }, dropRef] = useDrop(() => ({
    accept: "ingredient",
    drop: (item) => dispatch(addIngredient(item)),
  }));
  const handleDeleteIngredient = (unique_id) => {
    dispatch(deleteIngredient(unique_id));
  };
  const navigate = useNavigate();

  const createOrderHandler = (ids) => {
    if (!userAuth) {
      navigate("/login");
    } else  {
      dispatch(createOrder(ids));
    }
  };

  const handleBtnClick = (ids) => {
    setIsActive(true);
    createOrderHandler(ids);
  };

  const handleCloseModal = () => {
    setIsActive(false);
  };

  const AllIngr = buns && ingredients ? ingredients.concat(buns, buns) : [];
  const ids = useMemo(
    () => (AllIngr ? Array.from(AllIngr).map((item) => item.id) : null),
    [AllIngr],
  );

  return (
    <div className={styles.container}>
      <div className={styles.constructor__cont} ref={dropRef}>
        <div className={styles.top_bun}>
        {buns.length===0 &&
        (<div className={styles.top_noitem}>Добавьте булку!</div>)}
          {buns && buns[0] && (
            <ConstructorElement
              id={buns[0].id}
              type="top"
              isLocked={true}
              text={`${buns[0].name} (верх)`}
              price={buns[0].price}
              thumbnail={buns[0].image}
            />
          )}
        </div>
        <div className={styles.choice}>
          {ingredients &&
            ingredients.map((item, index) => (
              <BurgerConstructorElement
                ingredient={item}
                index={index}
                key={item.unique_id}
                unique_id={item.unique_id}
              />
            ))}
            {ingredients.length===0 &&
        (<div className={styles.center_noitem}>Добавьте ингредиенты!</div>)}
        </div>
        <div className={styles.low_bun}>
        {buns.length===0 &&
        (<div className={styles.bot_noitem}>Добавьте булку!</div>)}
          {buns && buns[0] && (
            <ConstructorElement
              id={buns[0].id}
              type="bottom"
              isLocked={true}
              text={`${buns[0].name} (низ)`}
              price={buns[0].price}
              thumbnail={buns[0].image}
            />
          )}
        </div>
      </div>
      <div className={styles.total}>
        <div className={styles.cost}>
          <p className="text text_type_digits-medium mr-2">
            {buns && ingredients && (
              <TotalPrice buns={buns} ingredients={ingredients} />
            )}
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
          disabled={!buns || buns.length === 0} 
          size="large"
          onClick={() => handleBtnClick(ids)}
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
      }),
    ),
  }),
};

export default BurgerConstructor;
