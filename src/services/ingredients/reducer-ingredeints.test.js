import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getIngredients,
  setActiveIngredient,
  deleteActiveIngredient,
  ingredientsSlice,
} from './reducer';

import { testIngr1,testIngr2 } from '../constructor/reducer-constructor.test';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('ingredientsSlice', () => {
  describe('reducers', () => {
    it('should handle setActiveIngredient', () => {
      const initialState = {
        ingredients: [],
        activeIngredient: {},
        buns: [],
        error: null,
        isLoading: false,
      };

      const newState = ingredientsSlice.reducer(initialState, setActiveIngredient({}));

      expect(newState.activeIngredient).toEqual('exampleId');
    });

    it('should handle deleteActiveIngredient', () => {
      const initialState = {
        ingredients: [],
        activeIngredient: null,
        buns: [],
        error: null,
        isLoading: false,
      };

      const newState = ingredientsSlice.reducer(initialState, deleteActiveIngredient());

      expect(newState.activeIngredient).toBeNull();
    });
  });

  describe('extraReducers', () => {
    it('should handle getIngredients.pending', () => {
      const initialState = {
        ingredients: [],
        activeIngredient: null,
        buns: [],
        error: null,
        isLoading: false,
      };

      const newState = ingredientsSlice.reducer(initialState, getIngredients.pending());

      expect(newState.isLoading).toBe(true);
    });

    it('should handle getIngredients.fulfilled', () => {
      const initialState = {
        ingredients: [],
        activeIngredient: null,
        buns: [],
        error: null,
        isLoading: true,
      };

      const responsePayload = [
        testIngr1,
        testIngr2,
      ];

      const newState = ingredientsSlice.reducer(initialState, getIngredients.fulfilled(responsePayload));

      expect(newState.isLoading).toBe(false);
      expect(newState.ingredients).toEqual([testIngr1]);
      expect(newState.buns).toEqual([testIngr2]);
      expect(newState.activeIngredient).toBeNull();
    });

    it('should handle getIngredients.rejected', () => {
      const initialState = {
        ingredients: [],
        activeIngredient: null,
        buns: [],
        error: null,
        isLoading: true,
      };

      const errorPayload = {
        message: 'Error',
      };

      const newState = ingredientsSlice.reducer(initialState, getIngredients.rejected(errorPayload));

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
          expect(actions[1].payload).toEqual([testIngr1]);
        });
    });
  });
});