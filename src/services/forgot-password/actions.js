import { fetchForgotPass } from "../../utils/api";

export const FORGOTPASS_REQUEST = "FORGOTPASS_REQUEST";
export const FORGOTPASS_SUCCESS = "FORGOTPASS_SUCCESS";
export const FORGOTPASS_FALSE = "FORGOTPASS_FALSE";

export const forgotPass = (email) => (dispatch) => {
  dispatch({ type: FORGOTPASS_REQUEST });
  return fetchForgotPass(email)
    .then((res) => {
      return dispatch({ type: FORGOTPASS_SUCCESS, payload: res});
    })
    .catch((error) => dispatch({ type: FORGOTPASS_FALSE, payload: error }));
};
