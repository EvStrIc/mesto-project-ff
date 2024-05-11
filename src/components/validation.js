// отображение ошибки
function showInputError(popupForm, popupInput, errorMessage, settings ) {
  const popupInputError = popupForm.querySelector(`.${popupInput.id}-error`);

  popupInput.classList.add(settings.inputErrorClass);
  popupInputError.textContent = errorMessage;
  popupInputError.classList.add(settings.errorClass);
}

// скрыть ошибку
function hideInputError(popupForm, popupInput, settings) {
  const popupInputError = popupForm.querySelector(`.${popupInput.id}-error`);

  popupInput.classList.remove(settings.inputErrorClass);
  popupInputError.classList.remove(settings.errorClass);
  popupInputError.textContent = "";
}

// проверка валидации
function checkInputValidity(popupForm, popupInput, settings) {
  if (popupInput.validity.patternMismatch) {
    popupInput.setCustomValidity(popupInput.dataset.errorMessage);
  } else {
    popupInput.setCustomValidity("");
  }

  if (!popupInput.validity.valid) {
    showInputError(popupForm, popupInput, popupInput.validationMessage, settings);
  } else {
    hideInputError(popupForm, popupInput, settings);
  }
}

// валидация значения поля ввода
function hasInvalidInput(popupInputList) {
  return popupInputList.some((popupInput) => {
    return !popupInput.validity.valid;
  });
}

// функция отключения кнопки подтверждения попапа
function disablePopupButton(popupButton, settings) {
  popupButton.disabled = true;
  popupButton.classList.add(settings.inactiveButtonClass);
}

// изменение состояния кнопки
function toggleButtonState(popupInputList, popupButton, settings) {
  if (hasInvalidInput(popupInputList)) {
    disablePopupButton(popupButton, settings);
  } else {
    popupButton.disabled = false;
    popupButton.classList.remove(settings.inactiveButtonClass);
  }
}

// обработчики полей формы
function setEventListeners(popupForm, settings) {
  const popupInputList = Array.from(popupForm.querySelectorAll(settings.inputSelector));
  const popupButton = popupForm.querySelector(settings.submitButtonSelector);

  popupInputList.forEach((popupInput) => {
    popupInput.addEventListener("input", () => {
      checkInputValidity(popupForm, popupInput, settings);
      toggleButtonState(popupInputList, popupButton, settings);
    });
  });
}

// включение валидации
export function enableValidation(settings) {
  const popupFormList = Array.from(
    document.querySelectorAll(settings.formSelector)
  );

  popupFormList.forEach((popupForm) => {
    setEventListeners(popupForm, settings);
  });
}

// очистка ошибок валидации
export function clearValidation(profileForm, settings) {
  const popupButton = profileForm.querySelector(settings.submitButtonSelector);
  const popupInputList = Array.from(
    profileForm.querySelectorAll(settings.inputSelector)
  );

  disablePopupButton(popupButton, settings);

  popupInputList.forEach((popupInput) => {
    popupInput.setCustomValidity("");
    hideInputError(profileForm, popupInput, settings);
  });
}
