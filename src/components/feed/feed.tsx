import React,{FC} from 'react';
import styles from './feed.module.css'
import FeedItem from './feed-item/feed-item';

const Feed: FC = () => {


return (
    <React.Fragment>
        <h2>Лента заказов</h2>
        <ul>
            <FeedItem/>
        </ul>
    </React.Fragment>
);
}

export default Feed;