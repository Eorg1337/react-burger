import { TIngredient } from "../../utils/types/types";
import { TSelectedIngrActions } from "../modal/actions";

export const CREATE_ORDER_DETAILS_MODAL: "CREATE_ORDER_DETAILS_MODAL" =
  "CREATE_ORDER_DETAILS_MODAL";

export const GET_ORDER_DETAILS_MODAL: "GET_ORDER_DETAILS_MODAL" =
  "GET_ORDER_DETAILS_MODAL";

export interface ICreateOrderDetailsAction {
  readonly type: typeof CREATE_ORDER_DETAILS_MODAL;
  readonly payload: TIngredient;
}

export interface IGetOrderDetailsAction {
  readonly type: typeof GET_ORDER_DETAILS_MODAL;
  readonly payload: number;
}

export type TModalActions = ICreateOrderDetailsAction | IGetOrderDetailsAction | TSelectedIngrActions;
