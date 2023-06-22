import React from 'react';
import {Counter,CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import '../../utils/data'
import styles from './burger-ingredient.module.css'


const BurgerIngredient = ({image, price, type, _id, name, __v}) => {
    return(
        <div id = {_id} type={type} className = {styles.ingredient}>
            { __v>0&& <Counter count={__v} size="default" extraClass="m-1"/>}
            <img src={image} alt="" className={styles.img}></img>
            <div className ={styles.price}>
                <strong className='text text_type_digits-default mr-2 mt-1 mb-1'>{price}</strong>
                <CurrencyIcon type="primary" />
            </div>
            <p className={styles.ingredientName}>{name}</p>
        </div>
    )
}

export default BurgerIngredient;