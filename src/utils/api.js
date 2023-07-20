export const DOMAIN_NAME = "https://norma.nomoreparties.space/api";
export const url = `${DOMAIN_NAME}/ingredients`;
export const orderUrl = `${DOMAIN_NAME}/orders`;

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
        return data;
      } else {
        console.error("error");
      }
    })
    .catch((err) => {
      console.error("Error", err);
    });
}

export const fetchRefreshToken = (refreshToken) => {
  return fetch(`${DOMAIN_NAME}/auth/token`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      token: refreshToken
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

export const fetchGetUserInfo = (accessToken) => {
  return fetch(`${DOMAIN_NAME}/auth/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken
    },
    method: "POST"
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

export const fetchRefreshUserInfo = (accessToken,email,name,password) => {
  return fetch(`${DOMAIN_NAME}/auth/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken
    },
    body: JSON.stringify({
      email,
      name,
      password
    }),
    method: "POST"
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

export const fetchUserLogout = (refreshToken) => {
  return fetch(`${DOMAIN_NAME}/auth/logout`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      token: refreshToken
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


