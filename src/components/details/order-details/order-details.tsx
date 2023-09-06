import React, { FC, useEffect } from "react";
import styles from "./order-details.module.css";
import graphics from "../../../images/graphics.svg";
import PropTypes from "prop-types";
import { useSelector } from "../../../services/store";
import { Order } from "../../../utils/types/types";
import { StateOrder } from "../../../services/order/reducer";
import { GET_ORDER_DETAILS_MODAL } from "../../../services/order-details/actions";
import { useDispatch } from "../../../services/store";
import { orderUrlWs } from "../../../utils/api";

type OrderDetailsProps = {
  ids: string[];
};

const OrderDetails: FC<OrderDetailsProps> = () => {
const {number} = useSelector((state) => state.order);


  return (
    <div className={styles.container}>
      <header className={`text text_type_digits-large ${styles.header}`}>
      {number ? number : "Loading..."}
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
