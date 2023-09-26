import { initialState, StateOrder } from './reducer';
import reducer from './reducer'
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FALSE,
} from './actions';
import { testOrder } from '../feed/reducer-feed.test';

describe('order reducer', () => {

  beforeEach(() => {
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {} )).toEqual(initialState);
  });

  it('should handle CREATE_ORDER_REQUEST', () => {
    const expectedState = {
      ...initialState,
      isLoading: true,
    };
    const action = { type: CREATE_ORDER_REQUEST };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CREATE_ORDER_SUCCESS', () => {
    const payload = testOrder;
    const expectedState = {
      ...initialState,
      isLoading: false,
      order: payload,
    };
    const action = { type: CREATE_ORDER_SUCCESS, payload };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle CREATE_ORDER_FALSE', () => {
    const payload = 'Error';
    const expectedState = {
      ...initialState,
      isLoading: false,
      error: payload,
    };
    const action = { type: CREATE_ORDER_FALSE, payload };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});