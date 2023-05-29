import React, {FC} from 'react';
import modalOverlayStyles from "../modal-overlay/modal-overlay.module.css";
import {useLocation, useNavigate} from "react-router-dom";
import {TModal} from "../../services/types/data";

type TModalOverlay = TModal & React.ButtonHTMLAttributes<HTMLDivElement>;

const ModalOverlay: FC<TModalOverlay> = ({active, setActive, children}) => {
const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const closeModalOverlay = () => {
    setActive(false);
    navigate(fromPage);
  }
  return (
    <div className={active
      ? [modalOverlayStyles.modal_overlay, modalOverlayStyles.modal_overlay_active].join(' ')
      : modalOverlayStyles.modal_overlay}
         onClick={closeModalOverlay}>
      {children}
    </div>
  );
};

export default ModalOverlay;
