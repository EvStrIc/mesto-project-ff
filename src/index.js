import { initialCards } from './components/cards';
import { createCard, deleteCard, likeCardButton } from './components/card';
import { openModal, closeModal } from './components/modal';
import './pages/index.css';

const placesList = document.querySelector('.places__list');

const popupList = document.querySelectorAll('.popup');

// Попап формы профиля
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditButton = document.querySelector('.profile__edit-button');

// Попап формы карточки
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupAddCardButton = document.querySelector('.profile__add-button');

// Форма профиля
const profileFormElement = document.querySelector('[name="edit-profile"]');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

// Форма карточки
const cardFormElement = document.querySelector('[name="new-place"]');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = cardFormElement.querySelector('.popup__input_type_url');

// Попап изображения карточки
const popupImage = document.querySelector(".popup_type_image");
const popupImageSrc = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__caption');

function changeProfileSubmit(evt) {
  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  profileTitle.textContent = name;
  profileDescription.textContent = job;

  closeModal();
}

function createCardFormSubmit(evt) {
  evt.preventDefault();

  const cardName = cardNameInput.value;
  const cardUrl = cardUrlInput.value;

  cardNameInput.value = '';
  cardUrlInput.value = '';

  placesList.prepend(createCard({name: cardName, link: cardUrl}, deleteCard, likeCardButton, openCardImage));

  closeModal();
}

function openCardImage (imageSrc, imageTitle) {
  popupImageSrc.src = imageSrc;
  popupImageSrc.alt = imageTitle;
  popupImageTitle.textContent = imageTitle;

  openModal(popupImage);
}

function addCards(cards) {
  cards.forEach((item) => {
    placesList.append(createCard(item, deleteCard, likeCardButton, openCardImage));
  });
}

addCards(initialCards);

popupList.forEach((popup) => {
  const popupCloseButton = popup.querySelector('.popup__close');

  popup.classList.add('popup_is-animated');
  
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal();
    }
  });
  
  popupCloseButton.addEventListener('click', () => closeModal());
});

popupEditButton.addEventListener('click', () => openModal(popupEdit));
popupAddCardButton.addEventListener('click', () => openModal(popupAddCard));

profileFormElement.addEventListener('submit', changeProfileSubmit); 

cardFormElement.addEventListener('submit', createCardFormSubmit); 


