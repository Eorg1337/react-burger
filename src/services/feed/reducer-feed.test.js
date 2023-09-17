import feedReducer from './feedReducer';
import {
  FEED_CLOSE_WS,
  FEED_CONNECT_WS,
  FEED_ERROR_WS,
  FEED_OPEN_WS,
  FEED_ORDER_WS,
} from './actions';
import { Order, OrdersResponse } from '../../utils/types/types';
import { WebSocketStatus } from '../../utils/types/types';

const initialState = {
  total: 0,
  totalToday: 0,
  status: WebSocketStatus.CLOSE,
  orders: [],
  error: '',
};

export const testOrder = {
  ingredients: [],
  _id: "1",
  status: "done",
  price: 1000,
  name: "something",
  number: 4550,
  createdAt: "11:00",
  updatedAt: "12:00"
}

export const testOrders = [
    testOrder,
      {
        ingredients: [],
        _id: "2",
        status: "done",
        price: 2000,
        name: "something else",
        number: 1911,
        createdAt: "14:15",
        updatedAt: "14:45"
      }
];

const total = 2;
const totalToday = 1;
const error = 'Error';

const connectAction = {
  type: FEED_CONNECT_WS,
  payload: WebSocketStatus.CONNECT,
};

const openAction = {
  type: FEED_OPEN_WS,
};

const closeAction = {
  type: FEED_CLOSE_WS,
};

const orderAction = {
  type: FEED_ORDER_WS,
  payload: { orders, total, totalToday },
};

const errorAction = {
  type: FEED_ERROR_WS,
  payload: error,
};

describe('feedReducer', () => {
  it('should return the initial state', () => {
    expect(feedReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FEED_CONNECT_WS action', () => {
    expect(feedReducer(initialState, connectAction)).toEqual({
      ...initialState,
      status: WebSocketStatus.CONNECT,
    });
  });

  it('should handle FEED_OPEN_WS action', () => {
    expect(feedReducer(initialState, openAction)).toEqual({
      ...initialState,
      status: WebSocketStatus.OPEN,
    });
  });

  it('should handle FEED_CLOSE_WS action', () => {
    expect(feedReducer(initialState, closeAction)).toEqual({
      ...initialState,
      status: WebSocketStatus.CLOSE,
    });
  });

  it('should handle FEED_ORDER_WS action', () => {
    expect(feedReducer(initialState, orderAction)).toEqual({
      ...initialState,
      testOrders,
      total,
      totalToday,
    });
  });

  it('should handle FEED_ERROR_WS action', () => {
    expect(feedReducer(initialState, errorAction)).toEqual({
      ...initialState,
      error,
    });
  });
});