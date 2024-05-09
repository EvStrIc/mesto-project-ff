import {
  addCardLike,
  createCard,
  deleteCard,
  deleteCardLike,
} from "./components/card";
import { openModal, closeModal } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import {
  getInitialCards,
  getUser,
  updateUser,
  updateAvatar,
  postCard,
  deleteCardRequest,
  putLike,
  deleteLike,
} from "./components/api";
import "./pages/index.css";

const placesList = document.querySelector(".places__list");

const popupList = document.querySelectorAll(".popup");

// Попап формы профиля
const popupEdit = document.querySelector(".popup_type_edit");
const popupEditButton = document.querySelector(".profile__edit-button");

// Попап формы для аватара
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupAvatarButton = document.querySelector(".profile__avatar");

// Попап формы карточки
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupAddCardButton = document.querySelector(".profile__add-button");

// Попап удаления карточки
const popupDeleteCard = document.querySelector(".popup_type_delete-card");

// Форма профиля
const profileFormElement = document.querySelector('[name="edit-profile"]');
const nameInput = profileFormElement.querySelector(".popup__input_type_name");
const jobInput = profileFormElement.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

// Форма аватара
const avatarFormElement = document.querySelector('[name="edit-avatar"]');
const avatarUrlInput = avatarFormElement.querySelector(
  ".popup__input_type_url"
);

// Форма карточки
const cardFormElement = document.querySelector('[name="new-place"]');
const cardNameInput = cardFormElement.querySelector(
  ".popup__input_type_card-name"
);
const cardUrlInput = cardFormElement.querySelector(".popup__input_type_url");

// Форма удаления карточки
const deleteCardFormElement = document.querySelector('[name="delete-card"]');

// Попап изображения карточки
const popupImage = document.querySelector(".popup_type_image");
const popupImageSrc = popupImage.querySelector(".popup__image");
const popupImageTitle = popupImage.querySelector(".popup__caption");

// Параметры валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// Параметры удаления карточки
const storage = {
  currentDeleteCardId: null,
  currentDeleteCardElement: null,
  userId: null,
};

// Изменение текста кнопки Сохранить
function changePopupSubmitButtonText(evt, text) {
  evt.submitter.textContent = text;
}

// Функция изменения данных профиля
function changeProfileSubmit(evt) {
  changePopupSubmitButtonText(evt, "Cохранение...");

  evt.preventDefault();

  const name = nameInput.value;
  const job = jobInput.value;

  updateUser({ name, about: job })
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;

      closeModal(popupEdit);
    })
    .catch((err) => console.error(err))
    .finally(changePopupSubmitButtonText(evt, "Cохранить"));
}

// Функция изменения аватара профиля
function changeAvatarSubmit(evt) {
  changePopupSubmitButtonText(evt, "Cохранение...");

  evt.preventDefault();

  const avatarUrl = avatarUrlInput.value;

  updateAvatar({ avatar: avatarUrl })
    .then((res) => {
      profileAvatar.src = res.avatar;
      avatarUrlInput.value = "";

      closeModal(popupAvatar);
    })
    .catch((err) => console.error(err))
    .finally(changePopupSubmitButtonText(evt, "Cохранить"));
}

// Функция удаления карточки
function deleteCardSubmit(evt) {
  evt.preventDefault();

  deleteCardRequest(storage.currentDeleteCardId)
    .then((res) => {
      deleteCard(storage.currentDeleteCardElement);

      storage.currentDeleteCardElement = null;
      storage.currentDeleteCardId = null;

      closeModal(popupDeleteCard);
    })
    .catch((err) => console.error(err));
}

// Функция открытия изображения из карточки
function openCardImage(imageSrc, imageTitle) {
  popupImageSrc.src = imageSrc;
  popupImageSrc.alt = imageTitle;
  popupImageTitle.textContent = imageTitle;

  openModal(popupImage);
}

// Функция открытия попапа удаления карточки
function openDeleteCard(id, element) {
  storage.currentDeleteCardId = id;
  storage.currentDeleteCardElement = element;

  openModal(popupDeleteCard);
}

// Управление состоянием кнопки лайка и счетчиком лайков
function likeCardButton({ likeButton, likeCounter }, { id }) {
  if (likeButton.classList.contains("card__like-button_is-active")) {
    deleteLike(id)
      .then((res) => {
        deleteCardLike(likeButton, likeCounter, res.likes.length);
      })
      .catch((err) => console.error(err));
  } else {
    putLike(id)
      .then((res) => {
        addCardLike(likeButton, likeCounter, res.likes.length);
      })
      .catch((err) => console.error(err));
  }
}

// Функция создания карточки
function createCardFormSubmit(evt) {
  changePopupSubmitButtonText(evt, "Cохранение...");

  evt.preventDefault();

  const cardName = cardNameInput.value;
  const cardUrl = cardUrlInput.value;

  postCard({ name: cardName, link: cardUrl })
    .then((res) => {
      placesList.prepend(
        createCard(
          res,
          storage.userId,
          openDeleteCard,
          likeCardButton,
          openCardImage
        )
      );

      cardNameInput.value = "";
      cardUrlInput.value = "";

      closeModal(popupAddCard);
    })
    .catch((err) => console.error(err))
    .finally(changePopupSubmitButtonText(evt, "Cохранить"));

  clearValidation(cardFormElement, validationConfig);
}

// Функция добавления на страницу всех созданных карточек
function addCards(cards, user) {
  cards.forEach((card) => {
    placesList.append(
      createCard(
        card,
        storage.userId,
        openDeleteCard,
        likeCardButton,
        openCardImage
      )
    );
  });
}

// Открытие попапа редактирования профиля
function openEditPopup() {
  openModal(popupEdit);

  if (popupEdit.querySelector(validationConfig.formSelector)) {
    clearValidation(popupEdit, validationConfig);
  }
}

// Открытие попапа редактирования аватара
function openAvatarPopup() {
  openModal(popupAvatar);

  if (popupAvatar.querySelector(validationConfig.formSelector)) {
    clearValidation(popupAvatar, validationConfig);
  }
}

// Открытие попапа добавления карточки
function openAddCardPopup() {
  openModal(popupAddCard);

  if (popupAddCard.querySelector(validationConfig.formSelector)) {
    clearValidation(popupAddCard, validationConfig);
  }
}

// Включение валидации форм
enableValidation(validationConfig);

popupList.forEach((popup) => {
  const popupCloseButton = popup.querySelector(".popup__close");

  popup.classList.add("popup_is-animated");

  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });

  popupCloseButton.addEventListener("click", () => closeModal(popup));
});

// Получение данных профиля и созданных карточек
Promise.all([getUser(), getInitialCards()])
  .then((res) => {
    const [user, cards] = res;

    storage.userId = user._id;

    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

    profileAvatar.src = user.avatar;

    addCards(cards, user);
  })
  .catch((err) => console.error(err));

// Обработчики открытия попапов
popupEditButton.addEventListener("click", openEditPopup);
popupAvatarButton.addEventListener("click", openAvatarPopup);
popupAddCardButton.addEventListener("click", openAddCardPopup);

// Обработчики подтверждения форм
profileFormElement.addEventListener("submit", changeProfileSubmit);

deleteCardFormElement.addEventListener("submit", deleteCardSubmit);

avatarFormElement.addEventListener("submit", changeAvatarSubmit);

cardFormElement.addEventListener("submit", createCardFormSubmit);
