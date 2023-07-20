import { fetchUserLogout } from "../../utils/api";

export const USERLOGOUT_REQUEST = "USERLOGOUT_REQUEST";
export const USERLOGOUT_SUCCESS = "USERLOGOUT_SUCCESS";
export const USERLOGOUT_FALSE = "USERLOGOUT_FALSE";

export const userLogout = (refreshToken) => (dispatch) => {
  dispatch({ type: USERLOGOUT_REQUEST });
  return fetchUserLogout(refreshToken)
    .then((res) => {
        console.log(res)
      return dispatch({ type: USERLOGOUT_SUCCESS, payload: res});
    })
    .catch((error) => dispatch({ type: USERLOGOUT_FALSE, payload: error }));
};
