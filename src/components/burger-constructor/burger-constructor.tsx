import React from "react";
import { useMemo } from "react";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
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
import { TIngredient } from "../../utils/types";

const BurgerConstructor = () => {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const dispatch: any = useDispatch();

  const ingredients = useSelector(
    (state: any) => state.rootReducer.constr?.constructorIngredients
  );
  const buns = useSelector(
    (state: any) => state.rootReducer.constr?.constructorBuns
  );
  const userAuth = useSelector(
    (state: any) => state.rootReducer.user?.user.name
  );

  const id = useSelector((state: any) => state.rootReducer.constr?.id);
  const [, dropRef] = useDrop(() => ({
    accept: "ingredient",
    drop: (item: TIngredient) => dispatch(addIngredient(item)),
  }));
  const handleDeleteIngredient = (unique_id: string) => {
    dispatch(deleteIngredient(unique_id));
  };
  const navigate = useNavigate();

  const createOrderHandler = (ids: Array<string> | null) => {
    if (!userAuth) {
      navigate("/login");
    } else {
      dispatch(createOrder(ids));
    }
  };

  const handleBtnClick = (ids: Array<string> | null) => {
    setIsActive(true);
    createOrderHandler(ids);
  };

  const handleCloseModal = () => {
    setIsActive(false);
  };

  const AllIngr: Array<TIngredient> =
    buns && ingredients ? ingredients.concat(buns, buns) : [];
  const ids: Array<string> | null = useMemo(
    () =>
      AllIngr ? Array.from(AllIngr).map((item: TIngredient) => item._id) : null,
    [AllIngr]
  );

  return (
    <div className={styles.container}>
      <div className={styles.constructor__cont} ref={dropRef}>
        <div className={styles.top_bun}>
          {!buns.length && (
            <div className={styles.top_noitem}>Перетащите булку!</div>
          )}
          {buns && buns[0] && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${buns[0].name} (верх)`}
              price={buns[0].price}
              thumbnail={buns[0].image}
            />
          )}
        </div>
        <div className={styles.choice}>
          {!ingredients.length && (
            <div className={styles.center_noitem}>Перетащите начинку!</div>
          )}
          {ingredients &&
            ingredients.map((item: TIngredient, index: number) =>
              item.unique_id ? (
                <BurgerConstructorElement
                  ingredient={item}
                  index={index}
                  key={item.unique_id}
                  unique_id={item.unique_id}
                  deleteIngredient={handleDeleteIngredient}
                />
              ) : null
            )}
        </div>
        <div className={styles.low_bun}>
          {!buns.length && (
            <div className={styles.bot_noitem}>Перетащите булку!</div>
          )}
          {buns && buns[0] && (
            <ConstructorElement
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

export default BurgerConstructor;
