import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import thunk from "redux-thunk";
import { checkAccessTokenExpiration } from "../middleware/middleware";

export const store = configureStore({
        reducer: {rootReducer},
        middleware: [thunk],

})