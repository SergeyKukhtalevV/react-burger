import React, {FC} from 'react';
import modalOverlayStyles from "../modal-overlay/modal-overlay.module.css";
import {useLocation, useNavigate} from "react-router-dom";

type TModalOverlay = {
  activeModalOverlay: boolean;
  setActiveModalOverlay: (arg: boolean) => void;
} & React.ButtonHTMLAttributes<HTMLDivElement>;

const ModalOverlay: FC<TModalOverlay> = ({activeModalOverlay, setActiveModalOverlay, children}) => {
const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const closeModalOverlay = () => {
    setActiveModalOverlay(false);
    navigate(fromPage);
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
