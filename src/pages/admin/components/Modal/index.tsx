import React from "react";
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
            stiffness: 500,
        },
    },
    exit: {
        y: "100vh",
        opacity: 0,
    },
};

interface IModal {
    handleClose?: () => void | any;
    text?: string;
    type?: string;
    modalOpen?: boolean;
}

interface IModalText {
    text?: string;
}

interface IModalButton {
    onClick?: () => void | any;
    label?: string;
}

const Modal = ({ handleClose, text, modalOpen }: IModal) => {

    return (
        <Backdrop onClick={handleClose}>
            {modalOpen ? <motion.div
                onClick={(e) => e.stopPropagation()}  // Prevent click from closing modal
                className="modal orange-gradient"
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <ModalText text={text} />
                <ModalButton onClick={handleClose} label="Close" />
            </motion.div> : null}
        </Backdrop>
    );
};

const ModalText = ({ text }: IModalText) => (
    <div className="modal-text">
        <h3>{text}</h3>
        <h5>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius laboriosam labore, totam
            expedita voluptates tempore asperiores sequi, alias cum veritatis, minima dolor iste similique
            eos id. Porro, culpa? Officiis, placeat?
        </h5>
    </div>
);

const ModalButton = ({ onClick, label } : IModalButton) => (
    <motion.button
        className="modal-button"
        type="button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
    >
        {label}
    </motion.button>
);

export default Modal;