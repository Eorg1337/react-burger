import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../../utils/api";


const initialState = {
    ingredients: [],
    error: null,
    isLoading: false
}


export const getIngredients = createAsyncThunk(
    'ingredients/getIngredients',
    async() => {
        const response = await fetchData();
        return response.data;
    }
)

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getIngredients.fulfilled, (state, action) => { 
    state.ingredients = action.payload;
    state.isLoading = false;
    });
    builder.addCase(getIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  }
})

export default ingredientsSlice.reducer;