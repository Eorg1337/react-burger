import React,{ useRef, useEffect } from 'react';
import  ReactDOM  from 'react-dom';
import { createPortal } from 'react-dom';
import styles from './my-modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';

const modalRoot = document.getElementById("react-modals");

const MyModal = ({ onClose, children, header }) => {

    const modalOverlayRef = useRef(null);
    const [isActive, setIsActive] = React.useState(false)
    
    function handleCloseIcon() {
        setIsActive(false);
    }

    function openModal(){
        setIsActive(true);
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 27) {
              setIsActive(false);
            }
          };
        document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }; 
    },[]);

    
    useEffect(() => {
        const handleOutsideClick = (e) => {
          if (modalOverlayRef.current && !modalOverlayRef.current.contains(e.target)) {
            setIsActive(false);
          }
        };
    
        document.addEventListener("mousedown", handleOutsideClick);
        
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      }, [isActive]);

    return ReactDOM.createPortal(
        isActive && (
        <ModalOverlay >
            <div className={styles.modal} ref={modalOverlayRef}>
                    <header onClose={onClose}>{header}</header>
                    {children}
                    <div className='pt-15 pr-10'>
                        <CloseIcon type="primary" onClick={handleCloseIcon}/>
                    </div>
            </div>
        </ModalOverlay>
        ), modalRoot
    )
    

}

export default MyModal;