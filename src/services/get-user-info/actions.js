import { fetchGetUserInfo } from "../../utils/api";

export const GETUSERINFO_REQUEST = "GETUSERINFO_REQUEST";
export const GETUSERINFO_SUCCESS = "GETUSERINFO_SUCCESS";
export const GETUSERINFO_FALSE = "GETUSERINFO_FALSE";

export const getUserInfo = (accessToken) => (dispatch) => {
  dispatch({ type: GETUSERINFO_REQUEST });
  return fetchGetUserInfo(accessToken)
    .then((res) => {
        console.log(res)
      return dispatch({ type: GETUSERINFO_SUCCESS, payload: res});
    })
    .catch((error) => dispatch({ type: GETUSERINFO_FALSE, payload: error }));
};
