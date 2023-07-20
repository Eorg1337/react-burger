import { 
    USERLOGIN_FALSE,
    USERLOGIN_REQUEST,
    USERLOGIN_SUCCESS
} from "./actions";

const initialState = {
    error: null,
    isLoading: null,
    user: {},
    accessToken: "",
    refreshToken: ""
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case USERLOGIN_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case USERLOGIN_SUCCESS:
        return {
          ...state,
          isLoading: false,
          user: action.payload.user,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken
        };
      case USERLOGIN_FALSE:
        return {
          state: initialState,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };