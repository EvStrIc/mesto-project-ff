const cardTemplate = document.querySelector('#card-template').content;

export function createCard (placeItem) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = placeItem.link;
  cardElement.querySelector('.card__image').alt = placeItem.description;
  cardElement.querySelector('.card__title').textContent = placeItem.name;
 
  deleteButton.addEventListener('click', function() {cardElement.remove();});

  return cardElement;
}

// Функции, обрабатывающие события лайка и удаления карточки, также должны находиться в этом файле и экспортироваться из него.