// Создание карточки
export function createCard(
  { placeItem, likes, id, isOwner, isLiked },
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

  popupCard.src = placeItem.link;
  popupCard.alt = placeItem.description;
  popupCardTitle.textContent = placeItem.name;

  likeCounter.textContent = likes;

  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () =>
    likeCardButton({ likeButton, likeCounter }, { id })
  );

  popupCard.addEventListener("click", () => {
    openCardImage(placeItem.link, placeItem.name);
  });

  if (isOwner) {
    deleteButton.addEventListener("click", () =>
      openDeleteCard(id, cardElement)
    );
  } else {
    deleteButton.classList.add("card__delete-button__invisible");
  }

  return cardElement;
}
