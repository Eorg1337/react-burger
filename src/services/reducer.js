import { combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredients/reducer";
import { reducer as orderReducer} from "./order/reducer";
import  selectedIngrReducer  from "./modal/reducer";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    modal: selectedIngrReducer,
    order: orderReducer
})