import { createSlice} from "@reduxjs/toolkit";


const initialState = {
    selectedIngr: []
}


export const selectedIngrSlice = createSlice({
    name: 'selectedIngr',
    initialState,
    reducers: {
        addSelectedIngr(state, action) {
            return {...state, selectedIngr: action.payload}
        },
        deleteSelectedIngr(state, action) {
            return {...state, selectedIngr: null}
        }
    },
})

export const { addSelectedIngr, deleteSelectedIngr } = selectedIngrSlice.actions;
export default selectedIngrSlice.reducer;