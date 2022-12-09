import React from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const Modal = ({active, setActive, children}) => {

  function closeModalByEscape(e) {
    if (e.key === 'Escape') {
      setActive(false);
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', closeModalByEscape);
    return () => document.removeEventListener('keydown', closeModalByEscape);
  });
  return ReactDOM.createPortal(
    <div
      className={active
        ? [modalStyles.modal__overlay, modalStyles.modal_active].join(' ')
        : modalStyles.modal__overlay}
      onKeyDown={(e) => {
        closeModalByEscape(e)
      }}
      onClick={() => {
        setActive(false)
      }}
      tabIndex='-1'
    >

      <div className={`${modalStyles.modal__content}`} onClick={e => e.stopPropagation()}>
        <div className={modalStyles.modal__iconClose}>
          <CloseIcon type="primary" onClick={() => {
            setActive(false)
          }}/>
        </div>
        {children}
      </div>
    </div>, document.getElementById('react-modals')
  );
};

export default Modal;