import { 
    RESETPASS_FALSE,
    RESETPASS_REQUEST,
    RESETPASS_SUCCESS
} from "./actions";

const initialState = {
    error: null,
    isLoading: null,
    message: ""
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case RESETPASS_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case RESETPASS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          message: action.payload,
        };
      case RESETPASS_FALSE:
        return {
          state: initialState,
          isLoading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };