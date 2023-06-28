import React,{ useState } from 'react';
import MyModal from '../../modal/my-modal'

const IngredientDetails = ({item,activeIngredient}) => {


    return(
        <>
            {item && activeIngredient===item &&(
            <div>
                <p>{item.name}</p>
                <p>{item.calories}</p>
                <p>{item.proteins}</p>
                <p>{item.fat}</p>
            </div>
            )}
        </>
    )
}

export default IngredientDetails;