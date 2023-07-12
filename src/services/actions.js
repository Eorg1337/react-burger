import { fetchData, fetchOrder } from "../utils/api";

export const GET_INGREDIENT_REQUEST = "GET_INGREDIENT_REQUEST";
export const GET_INGREDIENT_SUCCESS = "GET_INGREDIENT_SUCCESS";
export const GET_INGREDIENT_FALSE = "GET_INGREDIENT_FALSE";
export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FALSE = "CREATE_ORDER_FALSE";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const ADD_SELECTED_INGR = "ADD_SELECTED_INGR";
export const DELETE_SELECTED_INGR = "DELETE_SELECTED_INGR";


export const addIngredient = (ingredient) => ({
    type: ADD_INGREDIENT, payload: ingredient,
})

export const deleteIngredient = (id) => ({
    type: DELETE_INGREDIENT, payload: id,
})

export const addSelectedIngr = (item) => ({
    type: ADD_SELECTED_INGR, payload: item
})

export const deleteSelectedIngr = () => ({
    type: DELETE_SELECTED_INGR
})

export const addIngredients = () => (dispatch) => {
    dispatch({type: GET_INGREDIENT_REQUEST});
    return fetchData()
        .then(res => { 
            return dispatch({type: GET_INGREDIENT_SUCCESS, payload: res})
})
        .catch(error =>{
            return dispatch({type: GET_INGREDIENT_FALSE})
})
}

export const createOrder = (ingredients) => (dispatch) => {
    dispatch({type: CREATE_ORDER_REQUEST})
    return fetchOrder(ingredients)
        .then(res => {
           return dispatch({type: CREATE_ORDER_SUCCESS, payload: res.order})
        })
        .catch(error => dispatch({type: CREATE_ORDER_FALSE, payload: error}))
}