export function openModal (popup) {
  popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', escapeKeydownPopup);
}

export function closeModal () {
  const popupOpened = document.querySelector('.popup_is-opened');
  
  if (popupOpened) {
    popupOpened.classList.remove('popup_is-opened');
  }

  document.removeEventListener('keydown', escapeKeydownPopup);
}

export function escapeKeydownPopup (evt) {
  if (evt.key === 'Escape') {
    closeModal();
  }
}