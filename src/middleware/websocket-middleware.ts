import type { Middleware, MiddlewareAPI } from 'redux';
import type { ThunkAction, ThunkDispatch } from "redux-thunk";
import { OrdersResponse } from '../utils/types/types';
import { TFeedActions } from '../services/feed/actions';
    import { ActionCreatorWithPayload, ActionCreatorWithoutPayload } from "@reduxjs/toolkit";
import { rootReducer } from '../services/reducer';
import { TOrdersHistoryActions } from '../services/orders-history/actions';


type RootState = ReturnType<typeof rootReducer>;

export type TWebSocketActions = {
    wsConnect: ActionCreatorWithPayload<string>,
    wsOpen: ActionCreatorWithPayload<string>,
    wsClose: ActionCreatorWithoutPayload,
    wsError: ActionCreatorWithPayload<string>,
    wsGetOrder: ActionCreatorWithPayload<OrdersResponse>
}

export type AppActions = TFeedActions | TOrdersHistoryActions;

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;

export const socketMiddleware = (url: string, wsActions: TWebSocketActions): Middleware<{}, RootState> => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: AppActions) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsConnect, wsOpen, wsClose, wsError, wsGetOrder } = wsActions;
      if (wsConnect.match(action)) {
        socket = new WebSocket(`${url}`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch<any>({ type: wsOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch<any>({ type: wsError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData: OrdersResponse = JSON.parse(data);
          dispatch(wsGetOrder(parsedData));
        };

        socket.onclose = event => {
          dispatch<any>(wsClose());
        };
      }

      next(action);
    };
  });
};