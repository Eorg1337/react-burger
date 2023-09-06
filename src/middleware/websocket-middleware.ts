import type { Middleware, MiddlewareAPI } from "redux";
import type { ThunkAction, ThunkDispatch } from "redux-thunk";
import { OrdersResponse } from "../utils/types/types";
import { TFeedActions } from "../services/feed/actions";
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from "@reduxjs/toolkit";
import { rootReducer } from "../services/reducer";
import { TOrdersHistoryActions } from "../services/orders-history/actions";

type RootState = ReturnType<typeof rootReducer>;

export type TWebSocketActions = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsOpen: ActionCreatorWithoutPayload;
  wsClose: ActionCreatorWithoutPayload;
  wsError: ActionCreatorWithPayload<string>;
  wsGetOrder: ActionCreatorWithPayload<OrdersResponse>;
};

export type AppActions = TFeedActions | TOrdersHistoryActions;

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

export const socketMiddleware = (
  wsActions: TWebSocketActions
): Middleware<{}, RootState> => 
   (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action: AppActions) => {
      const { dispatch } = store;
      const { wsConnect, wsOpen, wsClose, wsError, wsGetOrder } = wsActions;
      const token = localStorage.getItem("accessToken");
      if (wsConnect.match(action)) {
        socket = new WebSocket(action.payload);
      }
      if (socket) {
        socket.onopen = () => {
          dispatch(wsOpen());
        };

        socket.onerror = (event) => {
          dispatch({ type: wsError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData: OrdersResponse = JSON.parse(data);
          dispatch(wsGetOrder(parsedData));
        };

        socket.onclose = () => {
          dispatch(wsClose());
        };
      }

      next(action);
    };
  };
