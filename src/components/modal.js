// Оттуда экспортируйте функции openModal и closeModal, принимающие в качестве аргумента DOM-элемент модального окна, 
// с которым нужно произвести действие

export function openModal (popup) {
  popup.classList.add('popup_is-opened');
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