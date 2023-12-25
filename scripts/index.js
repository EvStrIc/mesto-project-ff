// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function createCard (placeItem) {
  const placesList = document.querySelector('.places__list');
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = placeItem.link;
  cardElement.querySelector('.card__title').textContent = placeItem.name;

  placesList.append(cardElement); 

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function() {cardElement.remove();});
}

initialCards.forEach((placeItem) => {createCard(placeItem);});