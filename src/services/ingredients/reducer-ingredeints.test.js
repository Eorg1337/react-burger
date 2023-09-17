import configureStore from 'redux-mock-store';
import ingredientsReducer from "./reducer";
import thunk from 'redux-thunk';
import {
  getIngredients,
  setActiveIngredient,
  deleteActiveIngredient,
  initialState
} from './reducer';

import { testIngr1,testIngr2 } from '../constructor/reducer-constructor.test';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ingredientsSlice', () => {
  describe('reducers', () => {
    it('should handle setActiveIngredient', () => {

      const newState = ingredientsReducer(initialState, setActiveIngredient(null));

      expect(newState.activeIngredient).toEqual(null);
    });

    it('should handle deleteActiveIngredient', () => {

      const newState = ingredientsReducer(initialState, deleteActiveIngredient());

      expect(newState.activeIngredient).toBeNull();
    });
  });

  describe('extraReducers', () => {
    it('should handle getIngredients.pending', () => {

      const newState = ingredientsReducer(initialState, getIngredients.pending());

      expect(newState.isLoading).toBe(true);
    });

    it('should handle getIngredients.fulfilled', () => {

      const responsePayload = [
        testIngr1,
        testIngr2,
      ];

      const newState = ingredientsReducer(initialState, getIngredients.fulfilled(responsePayload));

      expect(newState.isLoading).toBe(false);
      expect(newState.ingredients).toEqual([testIngr1,testIngr2]);
      expect(newState.buns).toEqual([]);
      expect(newState.activeIngredient).toBeNull();
    });

    it('should handle getIngredients.rejected', () => {

      const errorPayload = {
        message: 'Error',
      };

      const newState = ingredientsReducer(initialState, getIngredients.rejected(errorPayload));

      expect(newState.isLoading).toBe(false);
      expect(newState.error).toEqual('Error');
    });
  });

  describe('async actions', () => {
    it('should fetch ingredients and update state', () => {
      const store = mockStore({});

      const mockFetchData = jest.fn().mockResolvedValue({ data: [testIngr1] });
      jest.mock('../../utils/api', () => ({
        fetchData: mockFetchData,
      }));

      return store.dispatch(getIngredients())
        .then(() => {
          const actions = store.getActions();

          expect(actions[0].type).toEqual(getIngredients.pending.type);
          expect(actions[1].type).toBe(getIngredients.fulfilled.type);
        });
    });
  });
});