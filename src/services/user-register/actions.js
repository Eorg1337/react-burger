import { fetchUserRegister } from "../../utils/api";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FALSE = "REGISTER_FALSE";

export const userRegister = (email,password,name) => (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  return fetchUserRegister(email,password,name)
    .then((res) => {
      return dispatch({ type: REGISTER_SUCCESS, payload: res});
    })
    .catch((error) => dispatch({ type: REGISTER_FALSE, payload: error }));
};
