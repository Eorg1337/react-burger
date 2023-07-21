import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
    fetchForgotPass,
    fetchGetUserInfo,
    fetchRefreshToken,
    fetchRefreshUserInfo,
    fetchUserLogin,
    fetchUserLogout,
    fetchResetPass,
    fetchUserRegister    
} from "../../utils/api";


const initialState = {
    user: {
        email: "",
        name: ""
    },
    message: "",
    accessToken: "",
    refreshToken: "",
    error: null,
    isLoading: false,
}

export const login = createAsyncThunk(
    "user/login",
    async({emailValue, passwordValue}) => {
        console.log({emailValue, passwordValue})
        const response = await fetchUserLogin(emailValue, passwordValue);
        return response
    }
)

export const logout = createAsyncThunk(
    "user/logout",
    async() => {
        const response = await fetchUserLogout();
        return response
    }
)

export const userRegister = createAsyncThunk(
    "user/userRegister",
    async() => {
        const response = await fetchUserRegister();
        return response
    }
)

export const forgotPass = createAsyncThunk(
    "user/forgotPass",
    async() => {
        const response = await fetchForgotPass();
        return response
    }
)

export const resetPass = createAsyncThunk(
    "user/resetPass",
    async() => {
        const response = await fetchResetPass();
        return response
    }
)

export const getUserInfo = createAsyncThunk(
    "user/getUserInfo",
    async() => {
        const response = await fetchGetUserInfo();
        return response
    }
)

export const refreshUserInfo = createAsyncThunk(
    "user/refreshUserInfo",
    async() => {
        const response = await fetchRefreshUserInfo();
        return response
    }
)

export const refreshToken = createAsyncThunk(
    "user/refreshToken",
    async() => {
        const response = await fetchRefreshToken();
        return response.data
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state,action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isLoading = false;
        });
        builder.addCase(login.rejected, (state,action) => {
            state.message = action.error.message;
        });
        builder.addCase(logout.pending, ()=>{})
        builder.addCase(logout.fulfilled, (state,action)=>{
            state.message = action.error.message
        })
        builder.addCase(logout.rejected, ()=>{})
        builder.addCase(userRegister.pending, (state)=>{
            state.isLoading = true;
        })
        builder.addCase(userRegister.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        })
        builder.addCase(userRegister.rejected, (state,action)=>{
            state.message = action.error.message;
        })
        builder.addCase(forgotPass.pending, (state)=>{
            state.isLoading = true;
        })
        builder.addCase(forgotPass.fulfilled, (state,action)=>{
            state.message = action.payload.message
            state.isLoading = false;
        })
        builder.addCase(forgotPass.rejected, (state,action)=>{
            state.message = action.error.message;
        })
        builder.addCase(resetPass.pending, (state)=>{
            state.isLoading = true;
        })
        builder.addCase(resetPass.fulfilled, (state,action)=>{
            state.message = action.payload.message
            state.isLoading = false;
        })
        builder.addCase(resetPass.rejected, (state,action)=>{
            state.message = action.error.message;
        })
        builder.addCase(getUserInfo.pending, (state)=>{
            state.isLoading = true;
        })
        builder.addCase(getUserInfo.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.user = action.payload.user
        })
        builder.addCase(getUserInfo.rejected, (state,action)=>{
            state.message = action.error.message;
        })
        builder.addCase(refreshUserInfo.pending, (state)=>{
            state.isLoading = true;
        })
        builder.addCase(refreshUserInfo.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.user = action.payload.user
        })
        builder.addCase(refreshUserInfo.rejected, (state,action)=>{
            state.message = action.error.message;
        })
        builder.addCase(refreshToken.pending, (state)=>{
            state.isLoading = true;
        })
        builder.addCase(refreshToken.fulfilled, (state,action)=>{
            state.isLoading = false;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        })
        builder.addCase(refreshToken.rejected, (state,action)=>{
            state.message = action.error.message;
        })
    }
}) 

export default userSlice.reducer;
