import React from 'react';
import modalStyles from './modal.module.css'

const Modal = ({active, setActive, children}) => {
  return (
    <div
      className={active ? [modalStyles.modal__overlay, modalStyles.modal_active].join(' ') : modalStyles.modal__overlay}
      onClick={() => {
        setActive(false)
      }}>
      <div className={`${modalStyles.modal__content}`} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
