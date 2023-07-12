import React from "react";
import { useContext,useMemo} from "react";
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
const BurgerConstructor = () => {
  const [isActive, setIsActive] = React.useState(false);

  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.constructor?.constructorIngredients)

  const createOrderHandler = (ingredients) => {
    dispatch(createOrder(ingredients))
  }

  const handleBtnClick = () => {
    setIsActive(true);
    createOrderHandler(ingredients);
  };

  const handleCloseModal = () => {
    setIsActive(false);
  };

  const filteredBuns = useMemo(() => ingredients?.find((item) => item.type === "bun"),[ingredients]);
  const filteredIngr = useMemo(() => ingredients?.filter((item) => item.type !== "bun"),[ingredients]);
  const ids = useMemo(() => filteredIngr
    ? Array.from(filteredIngr).map((item) => item._id)
    : null, [filteredIngr]);
  return (
    <div className={styles.container}>
      <div className={styles.constructor__cont}>
        <div className={styles.top_bun}>
          {filteredBuns && (
            <ConstructorElement
              _id={filteredBuns._id}
              type="top"
              isLocked={true}
              text={`${filteredBuns.name} (верх)`}
              price={filteredBuns.price}
              thumbnail={filteredBuns.image}
            />
          )}
        </div>
        <div className={styles.choice}>
          {filteredIngr &&
            filteredIngr.map((item,index) => (
              <div className={styles.constructor_item} key={index}>
                <DragIcon type="primary" />
                <ConstructorElement
                  _id={item._id}
                  type={item.type}
                  isLocked={false}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
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
          onClick={handleBtnClick}
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
