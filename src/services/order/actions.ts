import { fetchOrder } from "../../utils/api";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FALSE = "CREATE_ORDER_FALSE";


export interface ICreateOrderRequestAction{
  readonly type: typeof CREATE_ORDER_REQUEST;
}

export interface ICreateOrderSuccessAction{
  readonly type: typeof CREATE_ORDER_SUCCESS;
  readonly payload: number|undefined;
}

export interface ICreateOrderFalseAction{
  readonly type: typeof CREATE_ORDER_FALSE;
  readonly payload: string
}

export type TCreateOrders = ICreateOrderFalseAction
| ICreateOrderRequestAction
| ICreateOrderSuccessAction;

export const createOrder = (ids: string[]|null) => (dispatch: (action: TCreateOrders) => void) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  return fetchOrder(ids)
    .then((res) => {
      return dispatch({ type: CREATE_ORDER_SUCCESS, payload: res?.order });
    })
    .catch((error: string) => dispatch({ type: CREATE_ORDER_FALSE, payload: error }));
};
