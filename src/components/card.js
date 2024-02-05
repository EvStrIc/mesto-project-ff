export function createCard (placeItem, deleteCard, likeCardButton, openCardImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const popupCard = cardElement.querySelector('.card__image');
  const popupCardTitle = cardElement.querySelector('.card__title');

  const deleteButton = cardElement.querySelector('.card__delete-button');

  const likeButton = cardElement.querySelector('.card__like-button');

  popupCard.src = placeItem.link;
  popupCard.alt = placeItem.description;
  popupCardTitle.textContent = placeItem.name;

  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  likeButton.addEventListener('click', () => likeCardButton(likeButton));

  popupCard.addEventListener('click', () => {
    openCardImage(placeItem.link, placeItem.name);
  });

  return cardElement;
}

export function deleteCard (card) {
  card.remove();
}

export function likeCardButton (button) {
  if (button.classList.contains('card__like-button_is-active')) {
    button.classList.remove('card__like-button_is-active');
  } else {
    button.classList.add('card__like-button_is-active');
  }
}


