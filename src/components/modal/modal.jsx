import React from 'react';
import modalStyles from './modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ({active, setActive, children}) => {

  function closeModalByEscape(e) {
    if (e.nativeEvent.key === 'Escape') {
      setActive(false);
    }
  }

  return (
    <div
      className={active ? [modalStyles.modal__overlay, modalStyles.modal_active].join(' ') : modalStyles.modal__overlay}
      onClick={() => {setActive(false)}}
      onKeyDown={(e) => {
        closeModalByEscape(e)
      }}
      tabIndex='-1'
    >

      <div className={`${modalStyles.modal__content}`} onClick={e => e.stopPropagation()}>
        <div className={modalStyles.modal__iconClose}>
          <CloseIcon type="primary" onClick={() => {setActive(false)}}/>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
