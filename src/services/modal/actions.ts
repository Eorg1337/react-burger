import { TIngredient } from "../../utils/types/types";

export const ADD_SELECTED_INGR = "ADD_SELECTED_INGR";
export const DELETE_SELECTED_INGR = "DELETE_SELECTED_INGR";


export interface IAddSelectedIngrAction{
    readonly type: typeof ADD_SELECTED_INGR;
    readonly payload: TIngredient
}

export interface IDeleteSelectedIngrAction{
    readonly type: typeof DELETE_SELECTED_INGR;
}

export type TSelectedIngrActions = IAddSelectedIngrAction
| IDeleteSelectedIngrAction;

export const addSelectedIngr = (item: TIngredient): IAddSelectedIngrAction  => ({
    type: ADD_SELECTED_INGR, payload: item
})

export const deleteSelectedIngr = (): IDeleteSelectedIngrAction => ({
    type: DELETE_SELECTED_INGR
})