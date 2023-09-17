import { createSlice } from "@reduxjs/toolkit";
import {addSelectedIngr, deleteSelectedIngr , initialState} from "./reducer";
import selectedIngrReducer from "./reducer"
import { testIngr1 } from "../constructor/reducer-constructor.test";

describe("selectedIngrSlice", () => {
  test("addSelectedIngr action", () => {
    const ingredient = testIngr1;

    const newState = selectedIngrReducer(
      initialState,
      addSelectedIngr(ingredient)
    );

    expect(newState.selectedIngr).toEqual(ingredient);
  });

  test("deleteSelectedIngr action", () => {
    const initialState = { selectedIngr: testIngr1 };

    const newState = selectedIngrReducer(initialState, deleteSelectedIngr());

    expect(newState.selectedIngr).toBeNull();
  });
});