import { TOrdersHistoryActions, wsConnect, wsGetOrder, wsOpen } from "./actions";
import { ORDER_HISTORY_CLOSE_WS,
ORDER_HISTORY_CONNECT_WS,
ORDER_HISTORY_DISCONNECT_WS,
ORDER_HISTORY_ERROR_WS,
ORDER_HISTORY_OPEN_WS,
ORDER_HISTORY_ORDER_WS } from "./actions";
import { Order } from "../../utils/types/types";
import { WebSocketStatus } from "../../utils/types/types";

interface IInitialOrdersHistoryState {
    total: number,
    totalToday: number,
    status: WebSocketStatus,
    orders: Order[],
    error: string,
}

const initialState: IInitialOrdersHistoryState = {
    total: 0,
    totalToday: 0,
    orders: [],
    error: '',
    status: WebSocketStatus.CLOSE,
}


export const ordersHistoryReducer = (state = initialState, action: TOrdersHistoryActions) => {
    switch (action.type) {
      case ORDER_HISTORY_CONNECT_WS:
        return {
          ...state,
          status: WebSocketStatus.CONNECTING,
        };
      case ORDER_HISTORY_OPEN_WS:
        return {
          ...state,
          status: WebSocketStatus.OPEN,
        };
      case ORDER_HISTORY_CLOSE_WS: {
        return {
          ...state,
          status: WebSocketStatus.CLOSE,
        };
      }
      case ORDER_HISTORY_ORDER_WS:
        const { orders, total, totalToday } = action.payload;
        return {
          ...state,
          orders,
          total,
          totalToday,
        };
      case ORDER_HISTORY_ERROR_WS:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };