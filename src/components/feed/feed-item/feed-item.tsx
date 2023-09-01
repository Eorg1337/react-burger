import React,{FC} from 'react';
import styles from './feed-item.module.css'
import IngredientIcon from '../ingredient-icon/ingredient-icon';


const FeedItem: FC = () => {

return(
    <React.Fragment>
        <ul>
            <IngredientIcon ingredient={ingredient}/>
        </ul>
    </React.Fragment>
)
}

export default FeedItem;