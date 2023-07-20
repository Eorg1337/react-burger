import { combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredients/reducer";
import { reducer as orderReducer} from "./order/reducer";
import  selectedIngrReducer  from "./modal/reducer";
import constructorReducer from './constructor/reducer'
import {reducer as forgotPassReducer} from './forgot-password/reducer'
import {reducer as resetPassReducer} from './reset-password/reducer'
import {reducer as userLoginReducer} from './user-login/reducer'
export const rootReducer = combineReducers({
    constr: constructorReducer,
    ingredients: ingredientsReducer,
    modal: selectedIngrReducer,
    order: orderReducer,
    forgotPass: forgotPassReducer,
    resetPass: resetPassReducer,
    userLogin: userLoginReducer
})