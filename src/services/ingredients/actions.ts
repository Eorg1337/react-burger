export const SET_ACTIVE_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_ACTIVE_INGREDIENT = "DELETE_INGREDIENT";

export interface ISetActiveIngredientAction {
  readonly type: typeof SET_ACTIVE_INGREDIENT;
  readonly payload: { id: string };
}

export interface IDeleteActiveIngredientAction {
  readonly type: typeof DELETE_ACTIVE_INGREDIENT;
}

export type TActiveIngredientsActions =
  | ISetActiveIngredientAction
  | IDeleteActiveIngredientAction;

export const setActiveIngredient = (id: string): ISetActiveIngredientAction => {
  return {
    type: SET_ACTIVE_INGREDIENT,
    payload: { id },
  };
};

export const deleteActiveIngredient = (): IDeleteActiveIngredientAction => ({
  type: DELETE_ACTIVE_INGREDIENT,
});
