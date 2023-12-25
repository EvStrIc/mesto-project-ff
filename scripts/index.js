// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (placeItem) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = placeItem.link;
  cardElement.querySelector('.card__image').alt = placeItem.description;
  cardElement.querySelector('.card__title').textContent = placeItem.name;
 
  deleteButton.addEventListener('click', function() {cardElement.remove();});

  return cardElement;
}

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
function addCards(cards) {
  cards.forEach((item) => {placesList.append(createCard(item));});
}

addCards(initialCards);