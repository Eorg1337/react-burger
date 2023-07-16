import { createSlice} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    error: null,
    isLoading: false,
    constructorIngredients: [],
    constructorBuns: [] // adding constructorBuns array
}

export const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        addIngredient(state, action) {
            const newIngredient = {
                ...action.payload,
                unique_id: uuidv4()
            };
            let constructorIngredients = [];
            let constructorBuns = []; 
            if (newIngredient.type === "bun") {
                constructorBuns.push(newIngredient);
                constructorIngredients = state.constructorIngredients.filter(ing => ing.type !== "bun");
            } else {
                constructorIngredients = state.constructorIngredients.slice();
            }

            constructorIngredients.push(newIngredient);
            return { constructorIngredients, constructorBuns };
        },
        deleteIngredient(state, action) {
            const uniqueId = action.payload;
            const constructorIngredients = state.constructorIngredients.filter(ing => ing.unique_id !== uniqueId);

            const constructorBuns = state.constructorBuns.filter(bun => bun.unique_id !== uniqueId); // remove bun from constructorBuns if it matches the uniqueId

            return { constructorIngredients, constructorBuns };
        },

        moveIngredient(state,action) {
            const {dragIndex, hoverIndex} = action.payload;
            const dragCard = state.constructorIngredients[dragIndex];
            const newCards = [...state.constructorIngredients];
            newCards.splice(dragIndex, 1);
            newCards.splice(hoverIndex, 0, dragCard);

            state.constructorIngredients = newCards;
        }
    },
})

export const { addIngredient, deleteIngredient, moveIngredient } = constructorSlice.actions;
export default constructorSlice.reducer;