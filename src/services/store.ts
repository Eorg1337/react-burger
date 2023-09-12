import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import { ActionCreator, Action } from "@reduxjs/toolkit";
import { TMyActions } from "../utils/types/types";
import { orderUrl, orderUrlWs } from "../utils/api";
import { ThunkAction } from "redux-thunk";
import {
  useSelector as selectorHook,
  useDispatch as dispatchHook,
  TypedUseSelectorHook,
} from "react-redux";
import { socketMiddleware } from "../middleware/websocket-middleware";
import { FeedActions } from "./feed/actions";
import { OrdersHistoryActions } from "./orders-history/actions";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      socketMiddleware(FeedActions),
      socketMiddleware(OrdersHistoryActions)
    );
  },
});

type TApplicationActions = TMyActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => dispatchHook<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
