// Создание карточки
export function createCard(
  { createdAt, owner, name, _id, likes, link },
  userId,
  openDeleteCard,
  likeCardButton,
  openCardImage
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const popupCard = cardElement.querySelector(".card__image");
  const popupCardTitle = cardElement.querySelector(".card__title");

  const deleteButton = cardElement.querySelector(".card__delete-button");

  const likeButton = cardElement.querySelector(".card__like-button");

  const likeCounter = cardElement.querySelector(".card__like-counter");

  popupCard.src = link;
  popupCard.alt = name;
  popupCardTitle.textContent = name;

  likeCounter.textContent = likes.length;

  if (likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () =>
    likeCardButton({ likeButton, likeCounter }, { id: _id })
  );

  popupCard.addEventListener("click", () => {
    openCardImage(link, name);
  });

  if (owner._id === userId) {
    deleteButton.addEventListener("click", () =>
      openDeleteCard(_id, cardElement)
    );
  } else {
    deleteButton.classList.add("card__delete-button__invisible");
  }

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(deleteElement) {
  deleteElement.remove();
}

export function deleteCardLike(likeButton, likeCounter, finalLikes) {
  likeButton.classList.remove("card__like-button_is-active");
  likeCounter.textContent = finalLikes;
}

export function addCardLike(likeButton, likeCounter, finalLikes) {
  likeButton.classList.add("card__like-button_is-active");
  likeCounter.textContent = finalLikes;
}
