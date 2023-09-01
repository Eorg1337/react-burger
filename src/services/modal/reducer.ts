import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { TIngredient } from "../../utils/types";

interface ISelectedIngrState {
  selectedIngr: TIngredient|null;
}

const initialState: ISelectedIngrState = {
  selectedIngr: null,
};

const selectedIngrSlice = createSlice({
  name: "selectedIngr",
  initialState,
  reducers: {
    addSelectedIngr(state: ISelectedIngrState, action: PayloadAction<TIngredient>) {
      return { ...state, selectedIngr: action.payload };
    },
    deleteSelectedIngr(state) {
      return { ...state, selectedIngr: null };
    },
  },
});

export const { addSelectedIngr, deleteSelectedIngr } = selectedIngrSlice.actions;
export default selectedIngrSlice.reducer;