import React, { useRef, useEffect, PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const modalRoot = document.getElementById("react-modals") as Element;

type ModalProps = {
  onClose: () => void;
};

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
  onClose,
  children,
}) => {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} modalRef={modalRef} />
      <div className={styles.modal} ref={modalRef} tabIndex={0}>
        <div className={styles.children}>{children}</div>
        <div className={styles.icon}>
          <CloseIcon type="primary" onClick={onClose} />
        </div>
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
