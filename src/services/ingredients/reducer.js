import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../../utils/api";

const initialState = {
  ingredients: [],
  activeIngredient: null,
  buns: null,
  error: null,
  isLoading: false,
};

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async () => {
    const response = await fetchData();
    return response.data;
  },
);


export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setActiveIngredient(state, action) {
      let activeIngredient = null;
      console.log(action.payload)
      const newActiveIngredient = state.ingredients?.find((ingredient) => ingredient._id === action.payload) 
      || state.buns?.find((ingredient) => ingredient._id === action.payload);
      activeIngredient = newActiveIngredient;
      return { ...state,activeIngredient };
    },
    deleteActiveIngredient(state, action) {
      let activeIngredient = null
      return { ...state,activeIngredient };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload
        .filter((ingredient) => ingredient.type !== "bun")
        .map((ingredient) => ({
          ...ingredient,
          count: 0,
        }));
      state.buns = action.payload
        .filter((ingredient) => ingredient.type === "bun")
        .map((ingredient) => ({
          ...ingredient,
          count: 0,
        }));
      state.isLoading = false;
      state.activeIngredient = state.activeIngredient || null;
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});
export const { setActiveIngredient, deleteActiveIngredient} =
ingredientsSlice.actions;
export default ingredientsSlice.reducer;
