import { openModal } from "./modal";

export function createCard (placeItem, deleteCard, buttonLike, popupCardImage) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = placeItem.link;
  cardElement.querySelector('.card__image').alt = placeItem.description;
  cardElement.querySelector('.card__title').textContent = placeItem.name;
 
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard(cardElement));

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => buttonLike(likeButton));

  const popupImage = document.querySelector(".popup_type_image");
  const popupCard = cardElement.querySelector('.card__image');
  popupCard.addEventListener('click', () => {
    popupCardImage(popupImage, placeItem.link, placeItem.name);
  });

  return cardElement;
}

export function deleteCard (card) {
  card.remove();
}

export function buttonLike (button) {
  if (button.classList.contains('card__like-button_is-active')) {
    button.classList.remove('card__like-button_is-active');
  } else {
    button.classList.add('card__like-button_is-active');
  }
}

export function popupCardImage (popup, imageSrc, imageTitle) {
  const popupImageSrc = popup.querySelector('.popup__image');
  const popupImageTitle = popup.querySelector('.popup__caption');

  popupImageSrc.src = imageSrc;
  popupImageTitle.textContent = imageTitle;

  openModal(popup);
}


