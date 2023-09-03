import { TIngredient } from "../../utils/types/types";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";

export interface IAddIngredientAction{
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: {ingredient: TIngredient};
}

export interface IDeleteIngredientAction{
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: string;
}

export interface IMoveIngredientAction{
  readonly type: typeof MOVE_INGREDIENT;
  readonly payload: {dragIndex: string, hoverIndex: string};
}

export type TIngredientsActions = IAddIngredientAction
| IDeleteIngredientAction
| IMoveIngredientAction;

export const moveIngredient = (dragIndex: string, hoverIndex: string): IMoveIngredientAction => {
  return {
    type: MOVE_INGREDIENT,
    payload: { dragIndex, hoverIndex },
  };
};

export const addIngredient = (ingredient: TIngredient): IAddIngredientAction => {
  return {
    type: ADD_INGREDIENT,
    payload: { ingredient },
  };
};

export const deleteIngredient = (unique_id: string): IDeleteIngredientAction => ({
  type: DELETE_INGREDIENT,
  payload: unique_id,
});
