import './pages/index.css';
import { initialCards } from './components/cards';
import { createCard } from './components/card';
import { openModal, closeModal, popupEscapeKeydown } from './components/modal';

const placesList = document.querySelector('.places__list');

function addCards(cards) {
  cards.forEach((item) => {placesList.append(createCard(item));});
}

addCards(initialCards);

const popupList = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupEditButton = document.querySelector('.profile__edit-button');

const popupAddCard = document.querySelector('.popup_type_new-card');
const popupAddCardButton = document.querySelector('.profile__add-button');

const popupImage = document.querySelector('.popup_type_image');

const popupIsOpened = document.querySelector('.popup_is-opened');

// В файле index.js должны остаться:
// объявления и инициализация глобальных констант и переменных с DOM-элементами страницы,
// обработчики событий (при открытии и закрытии попапов; при отправке форм; обработчик, открывающий попап при клике по изображению карточки);
// вызовы других функций, подключённых из созданных модулей, которым нужно будет передавать объявленные здесь переменные и обработчики.

popupList.forEach((popup) => {
  popup.classList.add('popup_is-animated');

  const popupCloseButton = popup.querySelector('.popup__close');

  popupCloseButton.addEventListener('click', () => {
    closeModal(popup);
  });

  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  });

  document.addEventListener('keydown', (evt) => {
    popupEscapeKeydown(evt, popup);
  });
});

popupEditButton.addEventListener('click', () => {
  openModal(popupEdit);
});

popupAddCardButton.addEventListener('click', () => {
  openModal(popupAddCard);
});



const formElement = document.querySelector('.popup__form');

const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault();

    const name = nameInput.value;
    const job = jobInput.value;

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = name;
    profileDescription.textContent = job;
}

formElement.addEventListener('submit', handleFormSubmit); 