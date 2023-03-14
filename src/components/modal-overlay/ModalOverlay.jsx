import React from 'react';
import PropTypes from "prop-types";
import modalOverlayStyles from "../modal-overlay/modal-overlay.module.css";
import {useNavigate} from "react-router-dom";

const ModalOverlay = ({activeModalOverlay, setActiveModalOverlay, children}) => {
const navigate = useNavigate();
  const closeModalOverlay = () => {
    setActiveModalOverlay(false);
    navigate('/');
  }
  return (
    <div className={activeModalOverlay
      ? [modalOverlayStyles.modal_overlay, modalOverlayStyles.modal_overlay_active].join(' ')
      : modalOverlayStyles.modal_overlay}
         onClick={closeModalOverlay}>
      {children}
    </div>
  );
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  activeModalOverlay: PropTypes.bool.isRequired,
  setActiveModalOverlay: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired
}
