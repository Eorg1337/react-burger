import { 
    REFRESHTOKEN_FALSE,
    REFRESHTOKEN_REQUEST,
    REFRESHTOKEN_SUCCESS
} from "./actions";

const initialState = {
    error: null,
    isLoading: null,
    accessToken: "",
    refreshToken: ""
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case REFRESHTOKEN_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case REFRESHTOKEN_SUCCESS:
        return {
          ...state,
          isLoading: false,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken
        };
      case REFRESHTOKEN_FALSE:
        return {
          state: initialState,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };