import React from 'react';
import {Counter,CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredient.module.css'


const BurgerIngredient = (props) => {
    return(
        <div type={props.type} className = {styles.ingredient}>
            { props.__v>0&& <Counter count={props.__v} size="default" extraClass="m-1"/>}
            <img src={props.image} alt="" className={styles.img}></img>
            <div className ={styles.price}>
                <strong className='text text_type_digits-default mr-2 mt-1 mb-2'>{props.price}</strong>
                <CurrencyIcon type="primary" />
            </div>
            <p className={styles.ingredientName}>{props.name}</p>
        </div>
    )
}

export default BurgerIngredient;