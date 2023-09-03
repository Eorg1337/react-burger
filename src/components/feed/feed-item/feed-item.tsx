import React,{FC} from 'react';
import styles from './feed-item.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import image from "../../../images/bun-01.svg"



const FeedItem: FC = () => {
return(
    <div className={styles.container}>
        <li className={styles.item}>
        <div className={styles.header}>
          <span
            className={`${styles.orderNumber} text text_type_digits-default mr-4`}
          >
            #034535
          </span>
          <span className={`text text_type_main-default text_color_inactive`}>
            Сегодня, 16:20
          </span>
        </div>
        <h3
          className={`${styles.heading} text text_type_main-medium mt-6 mb-2`}
        >
          Death Star Starship Main бургер
        </h3>
          <span className={`text text_type_main-small`}>Готовится</span>
        <div className={`${styles.footer}  mt-6`}>
          <ul className={styles.ingredientsImages}>
            <li className={`${styles.ingredient}`}>
              <img
                className={styles.ingredientImage}
                src={image}
              />
            </li>
            <li className={`${styles.ingredient}`}>
              <img
                className={styles.ingredientImage}
                src={image}
              />
            </li>
            <li className={`${styles.ingredient}`}>
              <img
                className={styles.ingredientImage}
                src={image}
              />
            </li>
          </ul>
          <div className={styles.price}>
            <span className={`text text_type_digits-default mr-2`}>480</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
        </li>
    </div>
)
}

export default FeedItem;