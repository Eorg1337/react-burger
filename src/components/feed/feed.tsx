import React, { FC, useEffect, useState } from "react";
import styles from "./feed.module.css";
import FeedItem from "./feed-item/feed-item";
import InfoMenu from "./info-menu/info-menu";
import Modal from "../modal/modal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FeedItemDetails from "./feed-item-details/feed-item-details";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "../../services/store";
import { FEED_CLOSE_WS, FEED_CONNECT_WS } from "../../services/feed/actions";
import { orderUrl } from "../../utils/api";
import { State } from "../../utils/types/types";
import { CREATE_ORDER_DETAILS_MODAL } from "../../services/order-details/actions";
const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state: State) => state.feed);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({
      type: FEED_CONNECT_WS,
      payload: `${orderUrl}/all`,
    });
    return () => {
      dispatch({ type: FEED_CLOSE_WS });
    };
  }, [dispatch]);

  const handleItemClick = () => {
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
    navigate(`${location.pathname}`);
  };

  return (
    <React.Fragment>
      <section className={`${styles.pageContainer}`}>
        <h2 className={`${styles.pageHeading} text text_type_main-large  mb-5`}>
          Лента заказов
        </h2>
        <ul className={styles.orders} onClick={handleItemClick}>
          {orders?.map(({ ...order }) => {
            return <FeedItem {...order} key={`${order._id}${uuid()}`} />;
          })}
        </ul>
        <InfoMenu />
      </section>
      {isVisible && (
        <Modal onClose={handleCloseModal}>
          <FeedItemDetails />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Feed;
