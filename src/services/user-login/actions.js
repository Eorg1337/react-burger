import { fetchUserLogin } from "../../utils/api";

export const USERLOGIN_REQUEST = "USERLOGIN_REQUEST";
export const USERLOGIN_SUCCESS = "USERLOGIN_SUCCESS";
export const USERLOGIN_FALSE = "USERLOGIN_FALSE";

export const userLogin = (email,password) => (dispatch) => {
  dispatch({ type: USERLOGIN_REQUEST });
  return fetchUserLogin(email,password)
    .then((res) => {
        console.log(res)
      return dispatch({ type: USERLOGIN_SUCCESS, payload: res});
    })
    .catch((error) => dispatch({ type: USERLOGIN_FALSE, payload: error }));
};
