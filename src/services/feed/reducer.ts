import { TFeedActions, wsConnect, wsGetOrder, wsOpen } from "./actions";
import { 
FEED_CLOSE_WS,
FEED_CONNECT_WS,
FEED_ERROR_WS,
FEED_OPEN_WS,
FEED_ORDER_WS } from "./actions";
import { Order } from "../../utils/types/types";
import { WebSocketStatus } from "../../utils/types/types";

interface IInitialFeedState {
    total: number,
    totalToday: number,
    status: WebSocketStatus,
    orders: Order[],
    error: string,
}

const initialState: IInitialFeedState = {
    total: 0,
    totalToday: 0,
    orders: [],
    error: '',
    status: WebSocketStatus.CLOSE,
}


export const feedReducer = (state = initialState, action: TFeedActions) => {
    switch (action.type) {
      case FEED_CONNECT_WS:
        return {
          ...state,
          status: WebSocketStatus.CONNECTING,
        };
      case FEED_OPEN_WS:
        return {
          ...state,
          status: WebSocketStatus.OPEN,
        };
      case FEED_CLOSE_WS: {
        return {
          ...state,
          status: WebSocketStatus.CLOSE,
        };
      }
      case FEED_ORDER_WS:
        const { orders, total, totalToday } = action.payload;
        return {
          ...state,
          orders,
          total,
          totalToday,
        };
      case FEED_ERROR_WS:
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };