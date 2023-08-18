import React,{FC} from "react";
import styles from "./order-details.module.css";
import graphics from "../../../images/graphics.svg";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";


type OrderDetailsProps = {
  ids: string[];
}

const OrderDetails: FC<OrderDetailsProps> = (ids) => {
  const orderNumber = useSelector(
    (state: any) => state.rootReducer.order.order?.number,
  );

  return (
    <div className={styles.container}>
      <header className={`text text_type_digits-large ${styles.header}`}>
        {orderNumber}
      </header>
      <p className={`text text_type_main-medium ${styles.id}`}>
        идентификатор заказа
      </p>
      <div className={styles.img}>
        <img src={graphics} alt="" />
      </div>
      <p className={`text text_type_main-small ${styles.urOrd}`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`text text_type_main-small text_color_inactive ${styles.wait}`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};


export default OrderDetails;