export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";

export const moveIngredient = (dragIndex, hoverIndex) => {
  return {
    type: MOVE_INGREDIENT,
    payload: { dragIndex, hoverIndex },
  };
};

export const addIngredient = (ingredient) => {
  return {
    type: ADD_INGREDIENT,
    payload: { ingredient },
  };
};

export const deleteIngredient = (unique_id) => ({
  type: DELETE_INGREDIENT,
  payload: unique_id,
});
