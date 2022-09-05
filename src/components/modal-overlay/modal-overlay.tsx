import React from "react";
import styles from "./modal-overlay.module.css";

export interface IClickProps {
  onClick: (e: React.MouseEvent) => void;
}

const ModalOverlay = ({ onClick }: IClickProps) => {
  return <div className={styles.overlay} onClick={onClick} />;
};

export default ModalOverlay;
