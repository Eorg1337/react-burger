import { fetchOrder } from "../../utils/api";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FALSE = "CREATE_ORDER_FALSE";

export const createOrder = (ids: string[]|null) => (dispatch: any) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  return fetchOrder(ids)
    .then((res) => {
      return dispatch({ type: CREATE_ORDER_SUCCESS, payload: res?.order });
    })
    .catch((error) => dispatch({ type: CREATE_ORDER_FALSE, payload: error }));
};
