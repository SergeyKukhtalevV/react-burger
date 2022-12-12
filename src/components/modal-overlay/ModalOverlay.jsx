import React from 'react';
import PropTypes from "prop-types";
import modalOverlayStyles from "../modal-overlay/modal-overlay.module.css";

const ModalOverlay = ({activeModalOverlay, setActiveModalOverlay, children}) => {

  return (
    <div className={activeModalOverlay
      ? [modalOverlayStyles.modal_overlay, modalOverlayStyles.modal_overlay_active].join(' ')
      : modalOverlayStyles.modal_overlay}
         onClick={() => setActiveModalOverlay(false)}
    >
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
