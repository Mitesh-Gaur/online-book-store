import React, { ReactElement } from "react";
import { motion } from "framer-motion";
import Backdrop from "../Backdrop";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 700,
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
  },
};

interface IModal {
  handleClose?: () => void | any;
  handleSubmit?: () => void | any;
  modalTitle?: string;
  modalSubmitLabel?: string;
  text?: string;
  type?: string;
  modalOpen?: boolean;
  children?: ReactElement | null;
}

interface IModalText {
  text?: string;
}

interface IModalButton {
  onClick?: () => void | any;
  label?: string;
}

const Modal = ({
  children,
  modalOpen,
  modalTitle,
  modalSubmitLabel,
  handleClose,
  handleSubmit
}: IModal) => {

  return (
    <Backdrop onClick={handleClose}>
      {modalOpen ? <motion.div
        onClick={(e) => e.stopPropagation()}  // Prevent click from closing modal
        className="modal orange-gradient relative"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="modal-content">
          <div className="flex items-center justify-between p-4">
            <ModalTitle text={modalTitle} />
            <ModalButton onClick={handleClose} label="Close" />
          </div>
          <hr />
          {children}
          <ModalSubmitButton onClick={handleSubmit} label={modalSubmitLabel} />
        </div>
      </motion.div> : null}
    </Backdrop>
  );
};

const ModalSubmitButton = ({ onClick, label }: IModalButton) => (
  <div className="p-4 pt-0">
    <motion.button
      className="modal-button bg-gray-900 px-4 py-2 rounded"
      type="button"
      onClick={onClick}
    >
      <span className="text-white font-bold">{label}</span>
    </motion.button>
  </div>
)

const ModalTitle = ({ text }: IModalText) => (
  <div className="modal-title">
    <h3 className="text-gray-900 font-bold leading-7">{text}</h3>
  </div>
);

const ModalText = ({ text }: IModalText) => (
  <div className="modal-text p-4">
    <h5 className="text-gray-900">{text}</h5>
  </div>
);

const ModalButton = ({ onClick, label }: IModalButton) => (
  <motion.button
    className="modal-close-button ml-auto"
    type="button"
    onClick={onClick}
  >
    <svg version="1.1" className="w-4 h-3"
      xmlns="http://www.w3.org/2000/svg">
      <line x1="1" y1="11"
        x2="11" y2="1"
        stroke="black"
        strokeWidth="2" />
      <line x1="1" y1="1"
        x2="11" y2="11"
        stroke="black"
        strokeWidth="2" />
    </svg>
  </motion.button>
);

export default Modal;