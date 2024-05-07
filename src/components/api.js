// параметры для запросов
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-12",
  headers: {
    authorization: "88846c30-e810-49bd-8a43-9a5c28fa8986",
    "Content-Type": "application/json",
  },
};

// запрос данных профиля
export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Oшибка: ${res.status}`);
    })
    .catch((err) => console.error(err));
};

// запрос обновления данных профиля
export const updateUser = (user) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(user)
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Oшибка: ${res.status}`);
    })
    .catch((err) => console.error(err));
};

// запрос обновления аватара профиля
export const updateAvatar = (user) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(user)
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Oшибка: ${res.status}`);
    })
    .catch((err) => console.error(err));
};

// запрос получения созданных карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.error(err));
};

// запрос создания карточки
export const postCard = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(card)
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.error(err));
}

// запрос удаления карточки
export const deleteCardRequest = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.error(err));
}

// запрос постановки лайка
export const putLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.error(err));
}

// запрос удаления лайка
export const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.error(err));
}