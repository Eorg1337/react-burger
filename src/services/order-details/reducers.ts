import { TIngredient } from "../../utils/types/types";
import { TSelectedIngrActions } from "../modal/actions";
import { CREATE_ORDER_DETAILS_MODAL, GET_ORDER_DETAILS_MODAL, TModalActions } from "./actions";

type TOrderModalState = {
  ingredients: string[];
  _id: string;
  number: number;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export const initialState: TOrderModalState = {
  ingredients: [],
  _id: "",
  number: 0,
  status: "",
  name: "",
  createdAt: "",
  updatedAt: "",
};

export const orderDetailsModalReducer = (
  state = initialState,
  action: TModalActions
) => {
  switch (action.type) {
    case CREATE_ORDER_DETAILS_MODAL: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_ORDER_DETAILS_MODAL: {
      return {
        ...state,
        number: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
