import { 
    REGISTER_FALSE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from "./actions";

const initialState = {
    error: null,
    isLoading: null,
    user:{},
    accessToken: "",
    refreshToken: ""
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          user: action.payload.user,
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken
        };
      case REGISTER_FALSE:
        return {
          state: initialState,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };