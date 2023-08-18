import {PayloadAction} from "@reduxjs/toolkit";
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_FALSE,
    CREATE_ORDER_SUCCESS,
  } from "./actions";

  interface State {
    order: number|null,
    error: string|null,
    isLoading: boolean,
  }
  
  const initialState: State = {
    order: null,
    error: null,
    isLoading: false,
  };
  
  export const reducer = (state = initialState, action: PayloadAction<number|null>) => {
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
          state: initialState,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  