// параметры для запросов
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-12",
  headers: {
    authorization: "88846c30-e810-49bd-8a43-9a5c28fa8986",
    "Content-Type": "application/json",
  },
};

// Проверка ответа сервера
export function getResponseData(res) {
  if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
  }
  return res.json();
};

// запрос данных профиля
export const getUser = (res) => {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers })
    .then(getResponseData)
};

// запрос обновления данных профиля
export const updateUser = (user) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(user)
  })
    .then(getResponseData)
};

// запрос обновления аватара профиля
export const updateAvatar = (user) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(user)
  })
    .then(getResponseData)
};

// запрос получения созданных карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(getResponseData)
};

// запрос создания карточки
export const postCard = (card) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(card)
  })
    .then(getResponseData)
}

// запрос удаления карточки
export const deleteCardRequest = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(getResponseData)
}

// запрос постановки лайка
export const putLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(getResponseData)
}

// запрос удаления лайка
export const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(getResponseData)
}