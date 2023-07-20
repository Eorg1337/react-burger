import { 
    REFERSHUSERINFO_REQUEST,
    REFRESHUSERINFO_FALSE,
    REFRESHUSERINFO_SUCCESS
} from "./actions";

const initialState = {
    error: null,
    isLoading: null,
    user: {}
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case REFERSHUSERINFO_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case REFRESHUSERINFO_SUCCESS:
        return {
          ...state,
          isLoading: false,
          user: action.payload.user,
        };
      case REFRESHUSERINFO_FALSE:
        return {
          state: initialState,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };