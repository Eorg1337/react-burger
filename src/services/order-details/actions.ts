import { TIngredient } from "../../utils/types/types";
import { TSelectedIngrActions } from "../modal/actions";

export const CREATE_ORDER_DETAILS_MODAL: "CREATE_ORDER_DETAILS_MODAL" =
  "CREATE_ORDER_DETAILS_MODAL";

export interface IOrderDetailsAction {
  readonly type: typeof CREATE_ORDER_DETAILS_MODAL;
  readonly payload: TIngredient;
}

export type TModalActions = IOrderDetailsAction | TSelectedIngrActions;
