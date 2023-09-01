import React,{FC} from "react";
import styles from "./ingredient-icon.module.css"

const IngredientIcon:FC = ({ingredient}) => {

    return(
        <>
            <img alt={ingredient.name} 
            className={styles.icon}
            src={ingredient.image}/>

        </>
    )
}

export default IngredientIcon