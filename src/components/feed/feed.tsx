import React,{FC, useState} from 'react';
import styles from './feed.module.css'
import FeedItem from './feed-item/feed-item';
import InfoMenu from './info-menu/info-menu';
import Modal from '../modal/modal';
import { useLocation, useNavigate } from 'react-router-dom';
import FeedItemDetails from './feed-item-details/feed-item-details';
import { Link } from 'react-router-dom';

const Feed: FC = () => {
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

return (
    <section className={`${styles.pageContainer}`}>
        <h2 className={`${styles.pageHeading} text text_type_main-large  mb-5`}>Лента заказов</h2>
        <ul className={styles.orders} onClick={handleItemClick}>
        <Link
              key={123}
              to={`/orders/${123}`}
              state={{ background: location }}
              className={styles.link}
            >
            <FeedItem/>
        </Link>
            <FeedItem/>
            <FeedItem/>
            <FeedItem/>
        </ul>
        <InfoMenu/>
        {isVisible && (
            <Modal onClose={handleCloseModal}>
              <FeedItemDetails />
            </Modal>
          )}
    </section>
);
}

export default Feed;