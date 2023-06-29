import React,{ useState } from 'react';
import styles from './ingredient-details.module.css';

const IngredientDetails = ({activeIngredient}) => {

const dig_font = "text text_type_digits-default text_color_inactive";
const text_font = "text text_type_main-default text_color_inactive"
    return(
        <>            
            {activeIngredient &&(
            <div className = {styles.modal_container}>
                <header className={`text text_type_main-large ${styles.header}`}>Детали ингредиента</header>
                <img src={activeIngredient.image_large} className={styles.image}></img>
                <h2 className={`text text_type_main-medium ${styles.name}`}>{activeIngredient.name}</h2>
                <ul className={styles.ul_content}>
                    <div className = {styles.item}>
                        <p className={`${text_font} ${styles.p}`}>Калории, ккал</p>
                        <li className={`${dig_font} ${styles.li}`}>{activeIngredient.calories}</li>
                    </div>
                    <div className = {styles.item}>
                        <p className={`${text_font} ${styles.p}`}>Белки, г</p>
                        <li className={`${dig_font} ${styles.li}`}>{activeIngredient.proteins}</li>
                    </div>
                    <div className = {styles.item}>
                        <p className={`${text_font} ${styles.p}`}>Жиры, г</p>
                        <li className={`${dig_font} ${styles.li}`}>{activeIngredient.fat}</li>
                    </div>
                    <div className = {styles.item}>
                        <p className={`${text_font} ${styles.p}`}>Углеводы, г</p>
                        <li className={`${dig_font} ${styles.li}`}>{activeIngredient.carbohydrates}</li>
                    </div>
                </ul>
            </div>
            )}
            
        </>
    )
}

export default IngredientDetails;