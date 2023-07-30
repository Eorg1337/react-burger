export const SET_ACTIVE_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_ACTIVE_INGREDIENT = "DELETE_INGREDIENT";


export const setActiveIngredient = (id) => {
  return {
    type: SET_ACTIVE_INGREDIENT,
    payload: { id },
  };
};

export const deleteActiveIngredient = () => ({
  type: DELETE_ACTIVE_INGREDIENT
});
