import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchForgotPass,
  fetchGetUserInfo,
  fetchRefreshToken,
  fetchRefreshUserInfo,
  fetchUserLogin,
  fetchUserLogout,
  fetchResetPass,
  fetchUserRegister,
} from "../../utils/api";
import { IUserResetPass } from "../../utils/types/types";

interface UserState {
  user: {
    email: string;
    name: string;
  };
  success: boolean;
  message: string | undefined;
  error: null | string;
  isLoading: boolean;
}

export interface LoginPayload {
  emailValue: string;
  passwordValue: string;
}

interface UserRegisterPayload {
  emailValue: string;
  passwordValue: string;
  value: string;
}

interface ForgotPassPayload {
  emailValue: string;
}

interface ResetPassPayload {
  passwordValue: string;
  value: string;
}

interface RefreshUserInfoPayload {
  loginValue: string;
  nameValue: string;
  passwordValue: string;
}

const initialState: UserState = {
  user: {
    email: "",
    name: "",
  },
  success: false,
  message: "",
  error: null,
  isLoading: false,
};

export const login = createAsyncThunk(
  "user/login",
  async ({ emailValue, passwordValue }: LoginPayload) => {
    const response = await fetchUserLogin(emailValue, passwordValue);
    return response;
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  const response = await fetchUserLogout();
  return response;
});

export const userRegister = createAsyncThunk(
  "user/userRegister",
  async ({ emailValue, passwordValue, value }: UserRegisterPayload) => {
    const response = await fetchUserRegister(emailValue, passwordValue, value);
    return response;
  }
);

export const forgotPass = createAsyncThunk(
  "user/forgotPass",
  async ({ emailValue }: ForgotPassPayload) => {
    const response = await fetchForgotPass(emailValue);
    return response;
  }
);

export const resetPass = createAsyncThunk(
  "user/resetPass",
  async ({ passwordValue, value }: ResetPassPayload) => {
    const response = await fetchResetPass(passwordValue, value);
    return response;
  }
);

export const getUserInfo = createAsyncThunk("user/getUserInfo", async () => {
  const response: UserState = await fetchGetUserInfo();
  return response;
});

export const refreshUserInfo = createAsyncThunk(
  "user/refreshUserInfo",
  async ({ loginValue, nameValue, passwordValue }: RefreshUserInfoPayload) => {
    const response: UserState = await fetchRefreshUserInfo(
      loginValue,
      nameValue,
      passwordValue
    );
    return response;
  }
);

export const refreshToken = createAsyncThunk("user/refreshToken", async () => {
  const response = await fetchRefreshToken();
  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload?.user) {
        state.user = action.payload.user;
        state.success = true;
        state.isLoading = false;
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.success = false;
      state.message = action.error.message;
    });
    builder.addCase(logout.pending, () => {});
    builder.addCase(logout.fulfilled, (state, action) => {
      state.success = true;
      state.user = initialState.user;
    });
    builder.addCase(logout.rejected, () => {});
    builder.addCase(userRegister.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      if (action.payload?.user) {
      state.isLoading = false;
      state.user = action.payload?.user;
      state.success = true;
      }
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.message = action.error.message;
    });
    builder.addCase(forgotPass.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(forgotPass.fulfilled, (state, action) => {
      state.message = action.payload?.message;
      state.success = true;
      state.isLoading = false;
    });
    builder.addCase(forgotPass.rejected, (state, action) => {
      state.message = action.error.message;
    });
    builder.addCase(resetPass.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(resetPass.fulfilled, (state, action) => {
      state.message = action.payload?.message;
      state.success = true;
      state.isLoading = false;
    });
    builder.addCase(resetPass.rejected, (state, action) => {
      state.message = action.error.message;
    });
    builder.addCase(getUserInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.success = true;
      state.isLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(getUserInfo.rejected, (state, action) => {
      state.user = initialState.user;
      state.message = action.error.message;
    });
    builder.addCase(refreshUserInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(refreshUserInfo.fulfilled, (state, action) => {
      state.success = true;
      state.isLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(refreshUserInfo.rejected, (state, action) => {
      state.message = action.error.message;
    });
    builder.addCase(refreshToken.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.success = true;
      state.isLoading = false;
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.message = action.error.message;
    });
  },
});

export default userSlice.reducer;
