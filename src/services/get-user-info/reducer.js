import { 
    GETUSERINFO_FALSE,
    GETUSERINFO_REQUEST,
    GETUSERINFO_SUCCESS
} from "./actions";

const initialState = {
    error: null,
    isLoading: null,
    user: {}
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GETUSERINFO_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case GETUSERINFO_SUCCESS:
        return {
          ...state,
          isLoading: false,
          user: action.payload.user,
        };
      case GETUSERINFO_FALSE:
        return {
          state: initialState,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };