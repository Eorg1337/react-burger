import { TIngredient } from "../../utils/types";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";

export const moveIngredient = (dragIndex: string, hoverIndex: string) => {
  return {
    type: MOVE_INGREDIENT,
    payload: { dragIndex, hoverIndex },
  };
};

export const addIngredient = (ingredient: TIngredient) => {
  return {
    type: ADD_INGREDIENT,
    payload: { ingredient },
  };
};

export const deleteIngredient = (unique_id: string) => ({
  type: DELETE_INGREDIENT,
  payload: unique_id,
});
