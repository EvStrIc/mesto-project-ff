export function openModal (popup) {
  popup.classList.add('popup_is-opened');

  const popupCloseButton = popup.querySelector('.popup__close');
  popupCloseButton.addEventListener('click', () => closeModal(popup));

  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  });

  document.addEventListener('keydown', (evt) => {
    popupEscapeKeydown(evt, popup);
  });
}

export function closeModal (popup) {
  if (popup) {
    popup.classList.remove('popup_is-opened');
  }

  document.removeEventListener('keydown', (evt) => {
    popupEscapeKeydown(evt, popup);
  });
}

export function popupEscapeKeydown (evt, popup) {
  if (evt.key === 'Escape') {
    closeModal(popup);
  }
}