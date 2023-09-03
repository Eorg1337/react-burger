import React,{FC} from 'react';
import { useParams } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import image from '../../../images/bun-01.svg'
import styles from './feed-item-details.module.css'

const FeedItemDetails: FC = () => {
    const { id } = useParams();
return(
    <div className={styles.mainContainer}>
        <div className={styles.contentContainer}>
        <header className={styles.header}>
            <p className={`${styles.orderNumber} text text_type_digits-default`}>#034535</p>
            <h2>Black hole Singularity острый бургер</h2>
            <p className={styles.ready}>Выполнен</p>
            <h2 className={styles.info}>Состав:</h2>
        </header>
        <div className={styles.content}>
            <div>
                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        <div className={styles.leftContainer}>
                            <div className={styles.ingredient}>
                                <img src={image} alt="" className={styles.ingredientImage}/>
                            </div>
                            <h3 className="text text_type_main-default">Флюорисцентная булка R2-D3</h3>
                        </div>
                        <div className={styles.rightContainer}>
                            <p className={`text text_type_digits-default mr-2`}>2x20</p>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </li>
                        <li className={styles.listItem}>
                        <div className={styles.leftContainer}>
                            <div className={styles.ingredient}>
                                <img src={image} alt="" className={styles.ingredientImage}/>
                            </div>
                            <h3 className="text text_type_main-default">Флюорисцентная булка R2-D3</h3>
                        </div>
                        <div className={styles.rightContainer}>
                            <p className={`text text_type_digits-default mr-2`}>2x20</p>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </li>
                    <li className={styles.listItem}>
                    <div className={styles.leftContainer}>
                            <div className={styles.ingredient}>
                                <img src={image} alt="" className={styles.ingredientImage}/>
                            </div>
                            <h3 className="text text_type_main-default">Флюорисцентная булка R2-D3</h3>
                        </div>
                        <div className={styles.rightContainer}>
                            <p className={`text text_type_digits-default mr-2`}>2x20</p>
                            <CurrencyIcon type="primary"/>
                        </div>
                    </li>
                    <li className={styles.listItem}>
                    <div className={styles.leftContainer}>
                            <div className={styles.ingredient}>
                                <img src={image} alt="" className={styles.ingredientImage}/>
                            </div>
                            <h3 className="text text_type_main-default">Флюорисцентная булка R2-D3</h3>
                        </div>
                    <div className={styles.rightContainer}>
                        <p className={`text text_type_digits-default mr-2`}>2x20</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                </li>
                </ul>
            </div>
        </div>
        <footer className={styles.footer}>
                <span className={`text text_type_main-default text_color_inactive`}>
                    Вчера, 13:50
                </span>
                <div className={styles.rightContainer}>
                    <p className={`text text_type_digits-default mr-2`}>510</p>
                    <CurrencyIcon type="primary"/>
                </div>
        </footer>
        </div>
    </div>
)
}

export default FeedItemDetails;