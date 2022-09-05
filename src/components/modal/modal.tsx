import React, { useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";


const modalsContainer = document.querySelector("#modals") as HTMLElement;

interface IModal {
  title: string;
  onClose: () => void;
  children?: ReactNode;
}

const Modal = ({ title, children, onClose }: IModal) => {
  const handleEscKeydown = (evt: {key: string}) => {
    evt.key === "Escape" && onClose();
  };
  
  //больше не нужно?
  // const closeModalBtn = (evt: {target: string}) => {
  //   evt.target && onClose();
  // };

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeydown);
    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  });

  return createPortal(
    <>
      <div className={styles.container}>
        <h3 className={`${styles.title} text text_type_main-large mt-10 ml-10`}>
          {title}
        </h3>
        <button className={styles.closeBtn} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        <div className={styles.box}> {children}</div>
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalsContainer
  );
};

export default Modal;
