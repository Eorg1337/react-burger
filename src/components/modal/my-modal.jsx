import React,{ useRef, useEffect } from 'react';
import  ReactDOM  from 'react-dom';
import styles from './my-modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

const Modal = ({ onClose, children}) => {


  
  const modalRef = useRef();
 
  const closeModal = () => {
    onClose();  
  };



    useEffect(() => {  
      const handleKeyDown = (event) => {
      if (event.keyCode === 27 && onClose) {
        closeModal();
      }
    };
        document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }; 
    },[closeModal]);



    return ReactDOM.createPortal(
          (
        <ModalOverlay closeModal={closeModal} modalRef={modalRef}>
            <div className={styles.modal} ref={modalRef}>
              <div className={styles.children}>
                {children}
              </div>
              <div className={styles.icon}>
                <CloseIcon type="primary" 
                className = {styles.svg} 
                onClick={onClose}
                />
              </div>
            </div>
        </ModalOverlay> )
        , modalRoot
    )
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children:  PropTypes.elementType.isRequired
};

export default Modal;