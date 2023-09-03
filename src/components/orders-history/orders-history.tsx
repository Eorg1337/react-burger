import React from "react";
import FeedItem from "../feed/feed-item/feed-item";
import Feed from "../feed/feed";
import styles from './orders-history.module.css'
import { useNavigate,useLocation, Link } from "react-router-dom";
import Modal from "../modal/modal";
import OrdersHistoryDetails from "./orders-history-details/orders-history-details";
const OrdersHistory = () => {
    const [isVisible, setIsVisible] = React.useState<boolean>(false);
    const navigate = useNavigate();
    let location = useLocation();
    const handleItemClick = () => {
    setIsVisible(true);
    };
    
    const handleCloseModal = () => {
    setIsVisible(false);
    navigate(`${location.pathname}`);
    };

    return(
        <div className={styles.mainContainer} onClick={handleItemClick}>
            <Link
              key={123}
              to={`${123}`}
              state={{ background: location }}
              className={styles.link}
            >
                <FeedItem/>
            </Link>
            <FeedItem/>
            <FeedItem/>
            <FeedItem/>
            <FeedItem/>
            {isVisible && (
            <Modal onClose={handleCloseModal}>
              <OrdersHistoryDetails />
            </Modal>
          )}
        </div>
    )
}

export default OrdersHistory