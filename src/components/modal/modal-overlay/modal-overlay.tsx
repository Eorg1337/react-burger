import React, { useRef, useEffect, FC } from "react";
import styles from "./modal-overlay.module.css";

type ModalOverlayProps = {
  onClose: () => void;
  modalRef: React.RefObject<HTMLElement>;
}

const ModalOverlay: FC<ModalOverlayProps> = ({ onClose, modalRef }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        overlayRef.current &&
        overlayRef.current.contains(event.target as Node) && 
        !modalRef.current?.contains(event.target as Node)
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

export default ModalOverlay;
