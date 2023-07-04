import React from "react";
import { useContext} from "react";
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
import { ConstructorContext } from "../../services/consctructor-context";
import { TotalPrice } from "./total-price";

const BurgerConstructor = () => {
  const { data } = useContext(ConstructorContext);
  const [isActive, setIsActive] = React.useState(false);
  const handleBtnClick = () => {
    setIsActive(true);
  };

  const handleCloseModal = () => {
    setIsActive(false);
  };

  const filteredBuns = data?.find((item) => item.type === "bun");
  const filteredIngr = data?.filter((item) => item.type !== "bun");
  const ids = filteredIngr
    ? Array.from(filteredIngr).map((item) => item._id)
    : null;

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
            filteredIngr.map((item) => (
              <div className={styles.constructor_item} key={item._id}>
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
