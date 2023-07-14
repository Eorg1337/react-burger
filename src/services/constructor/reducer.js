import { createSlice} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    error: null,
    isLoading: false,
    constructorIngredients: [],
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
            if (newIngredient.type === "bun") {
                constructorIngredients = state.constructorIngredients.filter(ing => ing.type !== "bun");
            } else {
                constructorIngredients = state.constructorIngredients.slice();
            }
            constructorIngredients.push(newIngredient);
            return { constructorIngredients};
        },
        deleteIngredient(state, action) {
            console.log(action.payload)
            const constructorIngredients = state.constructorIngredients.filter(ing => ing.unique_id!== action.payload);
            return { constructorIngredients};
        },

        moveIngredient(state,action) {
            const { dragIndex, hoverIndex } = action;
            const ingredientList = [...state.constructorIngredients];
            const dragIngredient = ingredientList[dragIndex];
            ingredientList.splice(dragIndex, 1);
            ingredientList.splice(hoverIndex, 0, dragIngredient);
            return {
              constructorIngredients: ingredientList,
            };
        }
    },
})

export const { addIngredient, deleteIngredient, moveIngredient } = constructorSlice.actions;
export default constructorSlice.reducer;