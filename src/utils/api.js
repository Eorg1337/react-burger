const handleSaveAccessToken = (dataToStore) => {
  localStorage.setItem("accessToken",dataToStore);
  setTimeout(() => {
    localStorage.removeItem("accessToken");
  }, 20 * 60 * 1000); 
};
const handleSaveRefreshToken = (dataToStore) => {
  localStorage.setItem("refreshToken",dataToStore);
};
const storedAccessToken = localStorage.getItem("accessToken");
const storedRefreshToken = localStorage.getItem("refreshToken");

export const DOMAIN_NAME = "https://norma.nomoreparties.space/api";
export const url = `${DOMAIN_NAME}/ingredients`;
export const orderUrl = `${DOMAIN_NAME}/orders`;

const checkResponse = async (res) => {
  if (res.ok) {
    return res.json();
  } else {
    const err = await res.json();
    return Promise.reject(err);
  }
};

export const fetchData = () => {
  return fetch(`${DOMAIN_NAME}/ingredients`)
    .then((res) =>
      res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
    )
    .then((data) => {
      if (data?.success) {
        return data;
      } else {
        console.error("Ошибка получения данных");
      }
    })
    .catch((err) => {
      console.error("Error:", err);
    });
};

export const fetchOrder = (ingredients) => {
  return fetch(`${DOMAIN_NAME}/orders`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      ingredients,
    }),
  })
    .then((res) =>
      res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
    )
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

export const fetchForgotPass = (email) => {
  return fetch(`${DOMAIN_NAME}/password-reset`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
    }),
  })
  .then((res) =>
      res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
    )
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

}


export const fetchResetPass = (password,token) => {
  return fetch(`${DOMAIN_NAME}/password-reset/reset`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      password,
      token
    }),
  })
  .then((res) =>
      res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
    )
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
}


export const fetchUserRegister = (email,password,name) => {
  return fetch(`${DOMAIN_NAME}/auth/register`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      name
    }),
  })
  .then((res) =>
      res.ok ? res.json() : res.json().then((err) => Promise.reject(err)) 
    )
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
}

export const fetchUserLogin = (email,password) => {
  return fetch(`${DOMAIN_NAME}/auth/login`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password
    }),
  })
  .then((res) =>
      res.ok ? res.json() : res.json().then((err) => Promise.reject(err)) 
    )
    .then((data) => {
      if (data.success) {
        handleSaveAccessToken(data.accessToken)
        handleSaveRefreshToken(data.refreshToken)
        return data;
      } else {
        console.error("error");
      }
    })
    .catch((err) => {
      console.error("Error", err);
    });
}

export const fetchRefreshToken = () => {
  return fetch(`${DOMAIN_NAME}/auth/token`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
    token: storedRefreshToken
    }),
  })
  .then((res) =>
      res.ok ? res.json() : res.json().then((err) => Promise.reject(err)) 
    )
    .then((data) => {
      if (data.success) {
        handleSaveAccessToken(data.accessToken) 
        handleSaveRefreshToken(data.refreshToken)
        return data;
      } else {
        console.error("error");
      }
    })
    .catch((err) => {
      console.error("Error", err);
    });
}

export const fetchGetUserInfo = async () => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      authorization: storedAccessToken
    },
    method: "GET"
  };

  try {
    const res = await fetch(`${DOMAIN_NAME}/auth/user`, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await fetchRefreshToken();
      handleSaveAccessToken(refreshData.accessToken);
      handleSaveRefreshToken(refreshData.refreshToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`${DOMAIN_NAME}/auth/user`, options);
      console.log("Error:", err);
      return await checkResponse(res);
    } else {
      console.log("Error:", err);
      return Promise.reject(err);
    }
  }
};

export const fetchRefreshUserInfo = async (email, name, password) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      authorization: storedAccessToken,
    },
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
    if (err.message === "jwt expired") {
      const refreshData = await fetchRefreshToken();
      handleSaveAccessToken(refreshData.accessToken);
      handleSaveRefreshToken(refreshData.refreshToken);
      options.headers.authorization = refreshData.accessToken;
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
      token: storedRefreshToken
    }),
  })
  .then((res) =>
      res.ok ? res.json() : res.json().then((err) => Promise.reject(err)) 
    )
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
      console.error("Error", err);
    });
}


