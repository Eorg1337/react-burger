import React,{ useRef, useEffect } from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({children, closeModal, modalRef}) => {

    const overlayRef = useRef();

  useEffect(() => {
    const handleOutsideClick = event => {
      if (overlayRef.current && overlayRef.current.contains(event.target) && !modalRef.current.contains(event.target)) {
        closeModal();

      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeModal]);

    return(
        <div className = {styles.modalOverlay} ref={overlayRef}>
            {children}
        </div>
    )

}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children:  PropTypes.elementType.isRequired,
  modalRef: PropTypes.object.isRequired
};

export default ModalOverlay;
