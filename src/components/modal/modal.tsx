import React, {useCallback, FC} from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/ModalOverlay";
import {useLocation, useNavigate} from "react-router-dom";
import {TModal} from "../../services/types/data";

type TModalWindow = TModal & React.ButtonHTMLAttributes<HTMLBodyElement>;

const Modal: FC<TModalWindow> = ({active, setActive, children}) => {

  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  const closePopup = useCallback(() => {
    setActive(false);
    navigate(fromPage, {state: {from: location}});
  }, // eslint-disable-next-line
    [setActive, navigate, location]);

  React.useEffect(() => {

    function closeModalByEscape(e: KeyboardEvent) {
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
    <ModalOverlay active={active} setActive={setActive}>
        {children}

    </ModalOverlay>, document.getElementById('react-modals')!
  );
};

export default Modal;
