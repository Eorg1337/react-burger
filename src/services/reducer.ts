import { combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from "./ingredients/reducer";
import  reducer from "./order/reducer";
import selectedIngrReducer from "./modal/reducer";
import constructorReducer from "./constructor/reducer";
import userReducer from "./user/reducer";
import { orderDetailsModalReducer } from "./order-details/reducers";
import  feedReducer  from "./feed/reducer";
import ordersHistoryReducer from "./orders-history/reducer";

export const rootReducer = combineReducers({
  constr: constructorReducer,
  ingredients: ingredientsReducer,
  orderDetailsModal: orderDetailsModalReducer,
  modal: selectedIngrReducer,
  order: reducer,
  user: userReducer,
  feed: feedReducer,
  orderHistory: ordersHistoryReducer,
});
