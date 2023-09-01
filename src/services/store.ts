import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import { ActionCreator,Action } from "@reduxjs/toolkit";
import { TMyActions } from "../utils/types";
import thunk from "redux-thunk";
import { ThunkAction } from 'redux-thunk';
import {
        useSelector, 
        useDispatch as dispatchHook,
        shallowEqual,
} from 'react-redux';

export const store = configureStore({
        reducer: {rootReducer},
        middleware: [thunk],

})


type TApplicationActions = TMyActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type RootState = ReturnType<typeof store.getState>; 

export type AppDispatch = typeof store.dispatch; 

export const useAppDispatch = () => dispatchHook<AppDispatch|AppThunk>(); 

export const useAppSelector = <T>(
func: (state: RootState) => T,
cmp?: typeof shallowEqual
): T => useSelector(func, cmp);
