import { PayloadAction } from "@reduxjs/toolkit";
import { TCreateOrders } from "./actions";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FALSE,
  CREATE_ORDER_SUCCESS,
} from "./actions";
import { Order } from "../../utils/types/types";

export interface StateOrder {
  order: Order|undefined;
  error: string | null;
  isLoading: boolean;
}

const initialState: StateOrder = {
  order: undefined,
  error: null,
  isLoading: false,
};

const reducer = (state: StateOrder = initialState, action: TCreateOrders):StateOrder => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        order: action.payload,
      };
    case CREATE_ORDER_FALSE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
