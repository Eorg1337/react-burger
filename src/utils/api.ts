import { IUser, IUserResponse, TAuthUserResponse, TIngredient, TOrderDetails } from "./types";

const handleSaveAccessToken = (dataToStore: string) => {
  localStorage.setItem("accessToken", dataToStore);
  setTimeout(
    () => {
      localStorage.removeItem("accessToken");
    },
    20 * 60 * 1000,
  );
};
const handleSaveRefreshToken = (dataToStore: string) => {
  localStorage.setItem("refreshToken", dataToStore);
};
const storedAccessToken = localStorage.getItem("accessToken");
const storedRefreshToken = localStorage.getItem("refreshToken");

export const DOMAIN_NAME = "https://norma.nomoreparties.space/api";
export const url = `${DOMAIN_NAME}/ingredients`;
export const orderUrl = `${DOMAIN_NAME}/orders`;

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok
    ? res.json()
    : res.json().then((err) => Promise.reject(err));
};

type TServerResponse<T> = {
  success: boolean,
} & T;

type TRefreshResponse = TServerResponse<{ refreshToken: string, accessToken: string }>

type TFetchDataResponse = TServerResponse<{data:TIngredient[]}>;

type TOrderResponse = TServerResponse<TOrderDetails & {message: string}>;

type TForgotPassResponse = TServerResponse<{message:string}>;

type TResetPassResponse = TServerResponse<{message: string}>;

type TUserRegisterResponse = TServerResponse<IUserResponse>;

type TUserLoginResponse = TServerResponse<IUserResponse&TAuthUserResponse>;

type TUserLogoutResponse = TServerResponse<IUserResponse>

export const fetchData = async (): Promise<TFetchDataResponse> => {
  const response = await fetch(`${DOMAIN_NAME}/ingredients`);
  const data = await response.json();

  if (data.success === true) {
    return data;
  } else {
    throw new Error("Can't get data from server");
  }
};

export const fetchOrder = (ingredients: string[]|null) => {
  return fetch(`${DOMAIN_NAME}/orders`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      ingredients,
    }),
  })
    .then((res) => checkResponse<TOrderResponse>(res))
    .then((data) => {
      if (data.success) {
        return data;
      } else {
        console.error(data.message);
      }
    })
    .catch((err) => {
      console.error("Error", err);
    });
};

export const fetchForgotPass = (email: string) => {
  return fetch(`${DOMAIN_NAME}/password-reset`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  })
    .then((res) => checkResponse<TForgotPassResponse>(res))
    .then((data) => {
      if (data.success) {
        return data.message;
      } else {
        console.error("error");
      }
    })
    .catch((err) => {
      console.error("Error", err);
    });
};

export const fetchResetPass = (password: string, token: string) => {
  console.log(password, token,'in reset api')
  return fetch(`${DOMAIN_NAME}/password-reset/reset`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      password,
      token,
    }),
  })
    .then((res) => checkResponse<TResetPassResponse>(res))
    .then((data) => {
      if (data.success) {
        return data.message;
      } else {
        console.error("error");
      }
    })
    .catch((err) => {
      console.error("Error", err);
    });
};

export const fetchUserRegister = (email: string, password: string, name: string) => {
  return fetch(`${DOMAIN_NAME}/auth/register`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  })
    .then((res) => checkResponse<TUserRegisterResponse>(res))
    .then((data) => {
      if (data.success) {
        return data;
      } else {
        console.error("error");
      }
    })
    .catch((err) => {
      console.error("Error", err);
    });
};

export const fetchUserLogin = (email: string, password: string) => {
  return fetch(`${DOMAIN_NAME}/auth/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => checkResponse<TUserLoginResponse>(res))
    .then((data) => {
      if (data.success) {
        handleSaveAccessToken(data.accessToken);
        handleSaveRefreshToken(data.refreshToken);
        return data;
      } else {
        console.error("error");
      }
    })
    .catch((err) => {
      console.error("Error", err);
    });
};

export const fetchRefreshToken = () => {
  return fetch(`${DOMAIN_NAME}/auth/token`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      token: storedRefreshToken,
    }),
  })
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((data) => {
      if (data.success) {
        handleSaveAccessToken(data.accessToken);
        handleSaveRefreshToken(data.refreshToken);
        return data;
      } else {
        console.error("error");
      }
    })
    .catch((err) => {
      console.error("Error", err);
    });
};

export const fetchGetUserInfo = async <IUser>() => {
  const options: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      authorization: storedAccessToken,
    } as HeadersInit,
    method: "GET",
  };

  try {
    const res = await fetch(`${DOMAIN_NAME}/auth/user`, options);
    return await checkResponse<IUser>(res);
  } catch (err) {
    if ((err as {message:string}).message === "jwt expired") {
      const refreshData = await fetchRefreshToken();
      if (refreshData){
      handleSaveAccessToken(refreshData.accessToken);
      handleSaveRefreshToken(refreshData.refreshToken);
      (options.headers as {[key:string]: string}).authorization = refreshData.accessToken;
      }
      const res = await fetch(`${DOMAIN_NAME}/auth/user`, options);
      console.log("Error:", err);
      return await checkResponse<IUser>(res);
    } else {
      console.log("Error:", err);
      return Promise.reject(err);
    }
  }
};

export const fetchRefreshUserInfo = async (email: string, name: string, password: string) => {
  const options: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      authorization: storedAccessToken,
    } as HeadersInit,
    body: JSON.stringify({
      email,
      name,
      password,
    }),
    method: "PATCH",
  };
  try {
    const res = await fetch(`${DOMAIN_NAME}/auth/user`, options);
    if (res.ok) {
      return await res.json();
    } else {
      const err = await res.json();
      return Promise.reject(err);
    }
  } catch (err) {
    if ((err as {message:string}).message === "jwt expired") {
      const refreshData = await fetchRefreshToken();
      if(refreshData){
      handleSaveAccessToken(refreshData.accessToken);
      handleSaveRefreshToken(refreshData.refreshToken);
      (options.headers as {[key:string]: string}).authorization = refreshData.accessToken;
      }
      const res = await fetch(`${DOMAIN_NAME}/auth/user`, options);
      console.log("Error:", err);
      return await checkResponse(res);
    } else {
      console.log("Error:", err);
      return Promise.reject(err);
    }
  }
};

export const fetchUserLogout = () => {
  return fetch(`${DOMAIN_NAME}/auth/logout`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      token: storedRefreshToken,
    }),
  })
    .then((res) => checkResponse<TUserLogoutResponse>(res))
    .then((data) => {
      if (data.success) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return data;
      } else {
        console.error("error");
      }
    })
    .catch((err) => {
      console.log("Error", err);
    });
};
