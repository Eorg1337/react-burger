import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchData } from "../../utils/api";
import { TIngredient } from "../../utils/types/types";

interface InitialState {
  ingredients: TIngredient[];
  activeIngredient: TIngredient | null;
  buns: TIngredient[];
  error: string | null;
  isLoading: boolean;
}

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async () => {
    const response = await fetchData();
    return response.data;
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: [],
    activeIngredient: null,
    buns: [],
    error: null,
    isLoading: false,
  } as InitialState,
  reducers: {
    setActiveIngredient(
      state: InitialState,
      action: PayloadAction<string>
    ): InitialState {
      let activeIngredient: TIngredient | null = null;
      const newActiveIngredient =
        state.ingredients?.find(
          (ingredient) => ingredient._id === action.payload
        ) ||
        state.buns?.find((ingredient) => ingredient._id === action.payload);
      if (newActiveIngredient) {
        activeIngredient = newActiveIngredient;
      }
      return { ...state, activeIngredient };
    },
    deleteActiveIngredient(state): InitialState {
      let activeIngredient: TIngredient | null = null;
      return { ...state, activeIngredient };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload
        .filter((ingredient: TIngredient) => ingredient.type !== "bun")
        .map((ingredient: TIngredient) => ({
          ...ingredient,
          count: 0,
        }));
      state.buns = action.payload
        .filter((ingredient: TIngredient) => ingredient.type === "bun")
        .map((ingredient: TIngredient) => ({
          ...ingredient,
          count: 0,
        }));
      state.isLoading = false;
      state.activeIngredient = state.activeIngredient || null;
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});

export const { setActiveIngredient, deleteActiveIngredient } =
  ingredientsSlice.actions;
export default ingredientsSlice.reducer;
