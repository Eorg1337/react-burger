import { fetchData } from "../utils/api";

export const GET_INGREDIENT_REQUEST = "GET_INGREDIENT_REQUEST";
export const GET_INGREDIENT_SUCCESS = "GET_INGREDIENT_SUCCESS";
export const GET_INGREDIENT_FALSE = "GET_INGREDIENT_FALSE";

export const addIngredients = () => (dispatch) => {
  dispatch({ type: GET_INGREDIENT_REQUEST });
  return fetchData()
    .then((res) => {
      return dispatch({ type: GET_INGREDIENT_SUCCESS, payload: res });
    })
    .catch((error) => {
      return dispatch({ type: GET_INGREDIENT_FALSE });
    });
};
