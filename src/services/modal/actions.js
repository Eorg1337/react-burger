export const ADD_SELECTED_INGR = "ADD_SELECTED_INGR";
export const DELETE_SELECTED_INGR = "DELETE_SELECTED_INGR";

export const addSelectedIngr = (item) => ({
    type: ADD_SELECTED_INGR, payload: item
})

export const deleteSelectedIngr = () => ({
    type: DELETE_SELECTED_INGR
})