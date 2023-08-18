import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { TIngredient } from "../../utils/types";


interface StateConstructor { 
  error: string | null;
  isLoading: boolean;
  constructorIngredients: TIngredient[]
  constructorBuns: TIngredient[];
}

const initialState: StateConstructor = {
  error: null,
  isLoading: false,
  constructorIngredients: [],
  constructorBuns: [],
};

export const constructorSlice: any = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>): any {
      const newIngredient = {
        ...action.payload,
        unique_id: uuidv4(),
      };
      let constructorIngredients: TIngredient[] = [];
      let constructorBuns: TIngredient[] = [];
      if (newIngredient.type === "bun") {
        constructorBuns.push(newIngredient);
        constructorIngredients = [...state.constructorIngredients];
      } else {
        constructorBuns = [...state.constructorBuns];
        constructorIngredients = [...state.constructorIngredients];
        constructorIngredients.push(newIngredient);
      }

      return { constructorIngredients, constructorBuns };
    },
    deleteIngredient(state, action: PayloadAction<string>): any {
      const uniqueId = action.payload;
      const constructorIngredients = state.constructorIngredients.filter(
        (ing) => ing.unique_id !== uniqueId,
      );

      const constructorBuns = state.constructorBuns.filter(
        (bun) => bun.unique_id !== uniqueId,
      );

      return { constructorIngredients, constructorBuns };
    },

    moveIngredient(state, action: PayloadAction<{ dragIndex: number; hoverIndex: number }>) {
      const { dragIndex, hoverIndex } = action.payload;
      const dragCard = state.constructorIngredients[dragIndex];
      const newCards = [...state.constructorIngredients];
      newCards.splice(dragIndex, 1);
      newCards.splice(hoverIndex, 0, dragCard);

      state.constructorIngredients = newCards;
    },
  },
});

export const { addIngredient, deleteIngredient, moveIngredient } =
  constructorSlice.actions;
export default constructorSlice.reducer;