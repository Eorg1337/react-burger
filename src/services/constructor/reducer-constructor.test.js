import { v4 as uuidv4 } from "uuid";
import {addIngredient, deleteIngredient, moveIngredient, initialState } from "./reducer";
import constructorReducer from "./reducer";

export const testIngr1 = {
  _id: "777",
  name: "oleg",
  proteins: 777,
  fat: 777,
  carbohydrates: 777,
  calories: 777,
  price: 777,
  count: 0,
  image: "oleg",
  image_mobile: "oleg",
  image_large: "oleg",
  unique_id: uuidv4(),
  __v: 777,
}

export const testIngr2 = {
  _id: "888",
  name: "888",
  proteins: 888,
  fat: 888,
  carbohydrates: 888,
  calories: 888,
  price: 888,
  count: 0,
  image: "888",
  image_mobile: "888",
  image_large: "888",
  unique_id: uuidv4(),
  __v: 888,
}
describe("constructorSlice reducer", () => {

  it("should handle initial state", () => {
    expect(constructorReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle addIngredient", () => {
    const ingredient = testIngr1;
    const newState = constructorReducer(initialState, addIngredient(ingredient));

    expect(newState.constructorIngredients).toHaveLength(1);
    expect(newState.constructorIngredients[0]).toEqual({
      ...ingredient,
      unique_id: expect.any(String),
    });
  });

  it("should handle deleteIngredient", () => {
    const ingredient1 = testIngr1;
    const ingredient2 = testIngr2;
    const initialStateWithIngredients = {
      ...initialState,
      constructorIngredients: [ingredient1],
    };
    const newState = constructorReducer(
      initialStateWithIngredients,
      deleteIngredient(ingredient1.unique_id)
    );

    expect(newState.constructorIngredients).toHaveLength(0);
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