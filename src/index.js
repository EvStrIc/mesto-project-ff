import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard, deleteCard, buttonLike, popupCardImage } from './components/card';
import { openModal, closeModal, popupEscapeKeydown } from './components/modal';

// Инициализация начального списка карточек
const placesList = document.querySelector('.places__list');

function addCards(cards) {
  cards.forEach((item) => {
    placesList.append(createCard(item, deleteCard, buttonLike, popupCardImage));
  });
}

addCards(initialCards);

// Обработка попапов
const popupList = document.querySelectorAll('.popup');

popupList.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditButton = document.querySelector('.profile__edit-button');

const popupAddCard = document.querySelector('.popup_type_new-card');
const popupAddCardButton = document.querySelector('.profile__add-button');

popupEditButton.addEventListener('click', () => openModal(popupEdit));
popupAddCardButton.addEventListener('click', () => openModal(popupAddCard));

// редактирование данных профиля
const formElement = document.querySelector('[name="edit-profile"]');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

function handleFormSubmit(evt) {
    evt.preventDefault();

    const name = nameInput.value;
    const job = jobInput.value;

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = name;
    profileDescription.textContent = job;

    closeModal(popupEdit);
}

formElement.addEventListener('submit', handleFormSubmit); 

// добавление карточки
const cardFormElement = document.querySelector('[name="new-place"]');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardFormElement.querySelector('.popup__input_type_url');

function createCardFormSubmit(evt) {
  evt.preventDefault();

  const cardName = cardNameInput.value;
  const cardUrl = cardUrlInput.value;

  cardNameInput.value = '';
  cardUrlInput.value = '';

  placesList.prepend(createCard({name: cardName, link: cardUrl}, deleteCard, buttonLike, popupCardImage));

  closeModal(popupAddCard);
}

cardFormElement.addEventListener('submit', createCardFormSubmit); 