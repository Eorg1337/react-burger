import { fetchRefreshToken } from "../../utils/api";

export const REFRESHTOKEN_REQUEST = "REFRESHTOKEN_REQUEST";
export const REFRESHTOKEN_SUCCESS = "REFRESHTOKEN_SUCCESS";
export const REFRESHTOKEN_FALSE = "REFRESHTOKEN_FALSE";

export const refreshToken = (refreshToken) => (dispatch) => {
  dispatch({ type: REFRESHTOKEN_REQUEST });
  return fetchRefreshToken(refreshToken)
    .then((res) => {
        console.log(res)
      return dispatch({ type: REFRESHTOKEN_SUCCESS, payload: res});
    })
    .catch((error) => dispatch({ type: REFRESHTOKEN_FALSE, payload: error }));
};
