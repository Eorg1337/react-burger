import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { TIngredient } from "../../utils/types";

interface ISelectedIngrState {
  selectedIngr: TIngredient[];
}

const initialState: ISelectedIngrState = {
  selectedIngr: [],
};

const selectedIngrSlice: Slice<ISelectedIngrState> = createSlice({
  name: "selectedIngr",
  initialState,
  reducers: {
    addSelectedIngr(state, action: PayloadAction<TIngredient[]>) {
      return { ...state, selectedIngr: action.payload };
    },
    deleteSelectedIngr(state) {
      return { ...state, selectedIngr: [] };
    },
  },
});

export const { addSelectedIngr, deleteSelectedIngr } = selectedIngrSlice.actions;
export default selectedIngrSlice.reducer;