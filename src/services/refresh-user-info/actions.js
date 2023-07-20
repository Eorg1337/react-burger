import { fetchRefreshUserInfo } from "../../utils/api";

export const REFERSHUSERINFO_REQUEST = "REFERSHUSERINFO_REQUEST";
export const REFRESHUSERINFO_SUCCESS = "REFRESHUSERINFO_SUCCESS";
export const REFRESHUSERINFO_FALSE = "REFRESHUSERINFO_FALSE";

export const refreshUserInfo = (accessToken,email,name,password) => (dispatch) => {
  dispatch({ type: REFERSHUSERINFO_REQUEST });
  return fetchRefreshUserInfo(accessToken,email,name,password)
    .then((res) => {
        console.log(res)
      return dispatch({ type: REFRESHUSERINFO_SUCCESS, payload: res});
    })
    .catch((error) => dispatch({ type: REFRESHUSERINFO_FALSE, payload: error }));
};
