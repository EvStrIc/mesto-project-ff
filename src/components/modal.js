export function openModal (popup) {
  popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', escapeKeydownPopup);
}

export function closeModal (popup) {
  popup.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', escapeKeydownPopup);
}

export function escapeKeydownPopup (evt) {
  const popupOpened = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    closeModal(popupOpened);
  }
}