import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import thunk from "redux-thunk";
import constructorReducer from './constructor/reducer'

export const store = configureStore({
        reducer: {rootReducer, constructorReducer},
        middleware: [thunk]
})