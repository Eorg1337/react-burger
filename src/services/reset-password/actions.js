import { fetchResetPass } from "../../utils/api";

export const RESETPASS_REQUEST = "RESETPASS_REQUEST";
export const RESETPASS_SUCCESS = "RESETPASS_SUCCESS";
export const RESETPASS_FALSE = "RESETPASS_FALSE";

export const resetPass = (password,token) => (dispatch) => {
  dispatch({ type: RESETPASS_REQUEST });
  return fetchResetPass(password,token)
    .then((res) => {
        console.log(res)
      return dispatch({ type: RESETPASS_SUCCESS, payload: res});
    })
    .catch((error) => dispatch({ type: RESETPASS_FALSE, payload: error }));
};
