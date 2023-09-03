import { createAction } from "@reduxjs/toolkit";
import { OrdersResponse } from "../../utils/types/types";

export const FEED_CONNECT_WS = 'FEED_CONNECT_WS';
export const FEED_OPEN_WS = 'FEED_OPEN_WS';
export const FEED_CLOSE_WS = 'FEED_CLOSE_WS';
export const FEED_ORDER_WS = 'FEED_ORDER_WS';
export const FEED_ERROR_WS = 'FEED_ERROR_WS';



export const wsConnect = createAction<string, typeof FEED_CONNECT_WS>(FEED_CONNECT_WS);
export const wsOpen = createAction<OrdersResponse>(FEED_OPEN_WS);
export const wsGetOrder = createAction<OrdersResponse>(FEED_ORDER_WS);
export const wsClose = createAction(FEED_CLOSE_WS);
export const wsError = createAction<string, typeof FEED_ERROR_WS>(FEED_ERROR_WS);

export type TFeedActions = ReturnType<typeof wsConnect>
|ReturnType<typeof wsOpen>
|ReturnType<typeof wsGetOrder>
|ReturnType<typeof wsClose>
|ReturnType<typeof wsError>

export const FeedActions = {
    wsConnect,
    wsOpen,
    wsGetOrder,
    wsClose,
    wsError
}



