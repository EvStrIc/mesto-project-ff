// отображение ошибки
function showInputError(popupForm, popupInput, errorMessage) {
  const popupInputError = popupForm.querySelector(`.${popupInput.id}-error`);

  popupInput.classList.add('popup__input_type_error');
  popupInputError.textContent = errorMessage;
  popupInputError.classList.add('popup__input-error_active');
}

// скрыть ошибку
function hideInputError(popupForm, popupInput) {
  const popupInputError = popupForm.querySelector(`.${popupInput.id}-error`);

  popupInput.classList.remove('popup__input_type_error');
  popupInputError.classList.remove('popup__input-error_active');
  popupInputError.textContent = '';
}

// проверка валидации
function checkInputValidity(popupForm, popupInput) {
  if (popupInput.validity.patternMismatch) {
    popupInput.setCustomValidity(popupInput.dataset.errorMessage);
  } else {
    popupInput.setCustomValidity("");
  }

  if (!popupInput.validity.valid) {
    showInputError(popupForm, popupInput, popupInput.validationMessage);
  } else {
    hideInputError(popupForm, popupInput);
  }
}

// валидация значения поля ввода
function hasInvalidInput(popupInputList) {
  return popupInputList.some((popupInput) => {
    return !popupInput.validity.valid;
  })
}

// изменение состояния кнопки
function toggleButtonState(popupInputList, popupButton) {
  if (hasInvalidInput(popupInputList)) {
    popupButton.disabled = true;
    popupButton.classList.add('popup__button_inactive');
  } else {
    popupButton.disabled = false;
    popupButton.classList.remove('popup__button_inactive');
  }
}

// обработчики полей формы
function setEventListeners(popupForm) {
  const popupInputList = Array.from(popupForm.querySelectorAll('.popup__input'));
  const popupButton = popupForm.querySelector('.popup__button');

  popupInputList.forEach((popupInput) => {
    popupInput.addEventListener('input', () => {
      checkInputValidity(popupForm, popupInput);
      toggleButtonState(popupInputList, popupButton);
    });
  });
}

// включение валидации
export function enableValidation() {
  const popupFormList = Array.from(document.querySelectorAll('.popup__form'));

  popupFormList.forEach((popupForm) => {
    popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(popupForm);
  });
}

// очистка ошибок валидации
export function clearValidation(profileForm, validationConfig) {
  const popupButton = profileForm.querySelector(validationConfig.submitButtonSelector);
  const popupInputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));

  popupButton.disabled = true;
  popupButton.classList.add('popup__button_inactive');

  popupInputList.forEach((popupInput) => {
    popupInput.setCustomValidity("");
    hideInputError(profileForm, popupInput);
  })
}