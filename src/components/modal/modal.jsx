import React from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css'
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import ModalOverlay from "../modal-overlay/ModalOverlay";
import {useDispatch} from "react-redux";
import {REMOVE_CURRENT_INGREDIENT} from "../../services/actions/ingredients";

const Modal = ({active, setActive, children}) => {

  const dispatch = useDispatch();
  const removeCurrentIngredient = () => {
    dispatch({
      type: REMOVE_CURRENT_INGREDIENT
    });
  }
  function closePopup() {
    setActive(false);
    removeCurrentIngredient();
  }

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
  }, [active]);

  return ReactDOM.createPortal(
    <ModalOverlay activeModalOverlay={active} setActiveModalOverlay={setActive}>
      <div className={`${modalStyles.modal__content}`} onClick={e => e.stopPropagation()}>
        <div className={modalStyles.modal__iconClose}>
          <CloseIcon type="primary" onClick={closePopup}/>
        </div>
        {children}
      </div>
    </ModalOverlay>, document.getElementById('react-modals')
  );
};

export default Modal;

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired
}
