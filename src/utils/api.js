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
        return data.order;
      } else {
        console.error(data.message);
      }
    })
    .catch((err) => {
      console.error("Error", err);
    });
};
