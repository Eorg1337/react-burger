import { combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredients/reducer";
import { reducer as orderReducer} from "./order/reducer";
import  selectedIngrReducer  from "./modal/reducer";
import constructorReducer from './constructor/reducer'
import userReducer from './user/reducer'

export const rootReducer = combineReducers({
    constr: constructorReducer,
    ingredients: ingredientsReducer,
    modal: selectedIngrReducer,
    order: orderReducer,
    user: userReducer
})