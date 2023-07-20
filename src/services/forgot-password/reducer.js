import { 
    FORGOTPASS_FALSE, 
    FORGOTPASS_REQUEST,
    FORGOTPASS_SUCCESS 
} from "./actions";

const initialState = {
    error: null,
    isLoading: null,
    message: ""
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FORGOTPASS_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case FORGOTPASS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          message: action.payload,
        };
      case FORGOTPASS_FALSE:
        return {
          state: initialState,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };