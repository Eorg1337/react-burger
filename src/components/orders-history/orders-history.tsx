import React from "react";
import FeedItem from "../feed/feed-item/feed-item";
import Feed from "../feed/feed";
import styles from "./orders-history.module.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/store";
import Modal from "../modal/modal";
import {
  ORDER_HISTORY_CONNECT_WS,
  ORDER_HISTORY_CLOSE_WS,
} from "../../services/orders-history/actions";
import OrdersHistoryDetails from "./orders-history-details/orders-history-details";
import {
  Order,
  OrdersResponse,
  State,
  WebSocketStatus,
} from "../../utils/types/types";
import { orderUrl, orderUrlWs } from "../../utils/api";
const OrdersHistory = () => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const { orders } = useSelector((state: State) => state.orderHistory);
  let location = useLocation();
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");
  const handleItemClick = () => {
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
    navigate(`${location.pathname}`);
  };

  useEffect(() => {
    dispatch({
      type: ORDER_HISTORY_CONNECT_WS,
      payload: `${orderUrlWs}?token=${token?.replace(
        "Bearer ",
        ""
      )}`,
    });
    return () => {
      dispatch({
        type: ORDER_HISTORY_CLOSE_WS,
        payload: WebSocketStatus.CLOSE,
      });
    };
  }, [dispatch, token]);

  return (
    <div className={styles.mainContainer} onClick={handleItemClick}>
      <ul className={`${styles.feed}`}>
        {orders
          ? orders.map((order) => (
              <FeedItem withStatus {...order} key={order._id} />
            ))
          : null}
      </ul>

      {isVisible && (
        <Modal onClose={handleCloseModal}>
          <OrdersHistoryDetails />
        </Modal>
      )}
    </div>
  );
};

export default OrdersHistory;
