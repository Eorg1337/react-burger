import { createAction } from "@reduxjs/toolkit";
import { OrdersResponse } from "../../utils/types/types";

export const ORDER_HISTORY_CONNECT_WS = "ORDER_HISTORY_CONNECT_WS";
export const ORDER_HISTORY_OPEN_WS = "ORDER_HISTORY_OPEN_WS";
export const ORDER_HISTORY_CLOSE_WS = "ORDER_HISTORY_CLOSE_WS";
export const ORDER_HISTORY_ORDER_WS = "ORDER_HISTORY_ORDER_WS";
export const ORDER_HISTORY_ERROR_WS = "ORDER_HISTORY_ERROR_WS";
export const ORDER_HISTORY_DISCONNECT_WS = "ORDER_HISTORY_DISCONNECT_WS";

export const wsConnect = createAction<string, typeof ORDER_HISTORY_CONNECT_WS>(
  ORDER_HISTORY_CONNECT_WS
);
export const wsOpen = createAction(ORDER_HISTORY_OPEN_WS);
export const wsGetOrder = createAction<OrdersResponse>(ORDER_HISTORY_ORDER_WS);
export const wsClose = createAction(ORDER_HISTORY_CLOSE_WS);
export const wsError = createAction<string, typeof ORDER_HISTORY_ERROR_WS>(
  ORDER_HISTORY_ERROR_WS
);

export type TOrdersHistoryActions =
  | ReturnType<typeof wsConnect>
  | ReturnType<typeof wsOpen>
  | ReturnType<typeof wsGetOrder>
  | ReturnType<typeof wsClose>
  | ReturnType<typeof wsError>;

export const OrdersHistoryActions = {
  wsConnect,
  wsOpen,
  wsGetOrder,
  wsClose,
  wsError,
};
