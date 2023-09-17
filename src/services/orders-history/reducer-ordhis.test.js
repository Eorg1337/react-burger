import ordersHistoryReducer from './ordersHistoryReducer';
import {
  wsConnect,
  wsOpen,
  wsClose,
  wsOrder,
  wsError,
} from './actions';
import {
  ORDER_HISTORY_CONNECT_WS,
  ORDER_HISTORY_OPEN_WS,
  ORDER_HISTORY_CLOSE_WS,
  ORDER_HISTORY_ORDER_WS,
  ORDER_HISTORY_ERROR_WS,
} from './actions';

import { testOrders } from '../feed/reducer-feed.test';

describe('ordersHistoryReducer', () => {
  it('should return the initial state', () => {
    expect(ordersHistoryReducer(undefined, {})).toEqual({
      total: 0,
      totalToday: 0,
      orders: [],
      error: '',
      status: WebSocketStatus.CLOSE,
    });
  });

  it('should handle ORDER_HISTORY_CONNECT_WS', () => {
    expect(
      ordersHistoryReducer(undefined, {
        type: ORDER_HISTORY_CONNECT_WS,
      })
    ).toEqual({
      total: 0,
      totalToday: 0,
      orders: [],
      error: '',
      status: WebSocketStatus.CONNECTING,
    });
  });

  it('should handle ORDER_HISTORY_OPEN_WS', () => {
    expect(
      ordersHistoryReducer(undefined, {
        type: ORDER_HISTORY_OPEN_WS,
      })
    ).toEqual({
      total: 0,
      totalToday: 0,
      orders: [],
      error: '',
      status: WebSocketStatus.OPEN,
    });
  });

  it('should handle ORDER_HISTORY_CLOSE_WS', () => {
    expect(
      ordersHistoryReducer(undefined, {
        type: ORDER_HISTORY_CLOSE_WS,
      })
    ).toEqual({
      total: 0,
      totalToday: 0,
      orders: [],
      error: '',
      status: WebSocketStatus.CLOSE,
    });
  });

  it('should handle ORDER_HISTORY_ORDER_WS', () => {
    const orders = [testOrders];
    const total = 2;
    const totalToday = 1;

    expect(
      ordersHistoryReducer(undefined, {
        type: ORDER_HISTORY_ORDER_WS,
        payload: { orders, total, totalToday },
      })
    ).toEqual({
      total,
      totalToday,
      orders,
      error: '',
      status: WebSocketStatus.CLOSE,
    });
  });

  it('should handle ORDER_HISTORY_ERROR_WS', () => {
    const error = 'WebSocket error';

    expect(
      ordersHistoryReducer(undefined, {
        type: ORDER_HISTORY_ERROR_WS,
        payload: error,
      })
    ).toEqual({
      total: 0,
      totalToday: 0,
      orders: [],
      error,
      status: WebSocketStatus.CLOSE,
    });
  });
});