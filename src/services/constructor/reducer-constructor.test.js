import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { TIngredient } from "../../utils/types/types";
import { TIngredientsActions } from "./actions";

import constructorReducer, { addIngredient, deleteIngredient, moveIngredient } from "./reducer";

export const testIngr1 = {
  _id: "777",
  name: "oleg",
  proteins: 777,
  fat: 777,
  carbohydrates: 777,
  calories: 777,
  price: 777,
  image: "oleg",
  image_mobile: "oleg",
  image_large: "oleg",
  unique_id: uuidv4(),
  __v: 777,
}

export const testIngr2 = {
  _id: "888",
  name: "oleg",
  proteins: 777,
  fat: 777,
  carbohydrates: 777,
  calories: 777,
  price: 777,
  image: "oleg",
  image_mobile: "oleg",
  image_large: "oleg",
  unique_id: uuidv4(),
  __v: 777,
}
describe("constructorSlice reducer", () => {
  const initialState = {
    error: null,
    isLoading: false,
    constructorIngredients: [],
    constructorBuns: [],
  };

  it("should handle initial state", () => {
    expect(constructorReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle addIngredient", () => {
    const ingredient = testIngr1;
    const action = {
      type: addIngredient,
      payload: ingredient,
    };
    const expectedState = {
      ...initialState,
      constructorIngredients: [ingredient],
    };
    expect(constructorReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle deleteIngredient", () => {
    const ingredient1 = testIngr1;
    const ingredient2 = testIngr2;
    const initialStateWithIngredients = {
      ...initialState,
      constructorIngredients: [ingredient1, ingredient2],
    };
    const action = {
      type: deleteIngredient,
      payload: ingredient1.id,
    };
    const expectedState = {
      ...initialState,
      constructorIngredients: [ingredient2],
    };
    expect(constructorReducer(initialStateWithIngredients, action)).toEqual(expectedState);
  });

  it("should handle moveIngredient", () => {
    const ingredient1 = testIngr1;
    const ingredient2 = testIngr2;
    const initialStateWithIngredients = {
      ...initialState,
      constructorIngredients: [ingredient1, ingredient2],
    };
    const action = {
      type: moveIngredient,
      payload: { dragIndex: 0, hoverIndex: 1 },
    };
    const expectedState = {
      ...initialState,
      constructorIngredients: [ingredient2, ingredient1],
    };
    expect(constructorReducer(initialStateWithIngredients, action)).toEqual(expectedState);
  });
});