import React, { useRef, useEffect } from "react";
import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ children, onClose, modalRef }) => {
  const overlayRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        overlayRef.current &&
        overlayRef.current.contains(event.target) &&
        !modalRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);



  return (
    <div className={styles.modalOverlay} ref={overlayRef}/>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalRef: PropTypes.object.isRequired,
};

export default ModalOverlay;
