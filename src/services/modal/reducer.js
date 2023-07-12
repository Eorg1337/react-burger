import { createSlice} from "@reduxjs/toolkit";


const initialState = {
    selectedIngr: []
}


export const selectedIngrSlice = createSlice({
    name: 'selectedIngr',
    initialState,
    reducers: {
        addSelectedIngr(state, action) {
            let selectedIngr = [];
            if (!state.selectedIngr) {
                selectedIngr = [action.payload];
            } 
            return  {selectedIngr} ;
        },
        deleteSelectedIngr(state, action) {
            return state.selectedIngr.splice(0, state.length);
        }
    },
})

export const { addSelectedIngr, deleteSelectedIngr } = selectedIngrSlice.actions;
export default selectedIngrSlice.reducer;