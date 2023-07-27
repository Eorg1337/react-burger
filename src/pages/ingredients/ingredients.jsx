import React,{useEffect} from "react";
import IngredientDetails from "../../components/details/ingredient-details/ingredient-details";
import { useSelector } from "react-redux";
import {useMatch} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setActiveIngredient } from "../../services/ingredients/reducer";

const IngredientsPage = () => {
    const dispatch = useDispatch();
    const match = useMatch('/ingredients/:id');
    const params = match?.params;
    console.log("params id", params.id)
    useEffect(() => {
        if (params && params.id) {
          dispatch(setActiveIngredient(params.id));
        }
      }, [params]);
    
    return(
        <div>
            <IngredientDetails/>
        </div>
    )
}

export default IngredientsPage;