import ReactDOM, { createPortal } from 'react-dom';
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const modalsContainer = document.querySelector("#modals");

const Modal = ({ title, children, onClose }) => {
  
  const handleEscKeydown = (evt) => {
    evt.key === "Escape" && onClose();
  };

  const closeModalBtn = (evt) => {
    evt.target && onClose();
  };

  useEffect(() => {
    document.addEventListener("keydown", handleEscKeydown);
    return () => {
      document.removeEventListener("keydown", handleEscKeydown);
    };
  });

  return createPortal(
    <>
      <div className={styles.container}>
        <h3
          className={`${styles.title} text text_type_main-large mt-10 ml-10`}
        >
          {title}
        </h3>
        <button className={styles.closeBtn} onClick={closeModalBtn}>
          <CloseIcon type="primary" />
        </button>
        <div className={styles.box}> {children}</div>
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalsContainer
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
