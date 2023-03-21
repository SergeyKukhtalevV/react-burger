import React, {useCallback} from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import {useLocation, useNavigate} from "react-router-dom";

const Modal = ({active, setActive, children}) => {

  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const closePopup = useCallback(() => {
    setActive(false);
    navigate(fromPage, {state: {from: location}});
  }, [setActive, navigate, location]);

  React.useEffect(() => {

    function closeModalByEscape(e) {
      if (e.key === 'Escape') {
        closePopup();
      }
    }

    if (active) {
      document.addEventListener('keydown', closeModalByEscape);
      return () => {
        document.removeEventListener('keydown', closeModalByEscape);
      }
    }
  },
  // eslint-disable-next-line
  [active]);

  return ReactDOM.createPortal(
    <ModalOverlay activeModalOverlay={active} setActiveModalOverlay={setActive}>
      {/*<div className={`${modalStyles.modal__content}`} onClick={e => e.stopPropagation()}>*/}
      {/*  <div className={modalStyles.modal__iconClose}>*/}
      {/*    <CloseIcon type="primary" onClick={closePopup}/>*/}
      {/*  </div>*/}
        {children}
      {/*</div>*/}
    </ModalOverlay>, document.getElementById('react-modals')
  );
};

export default Modal;

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired
}
