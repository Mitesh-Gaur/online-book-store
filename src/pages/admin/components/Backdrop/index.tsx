import React from "react";
import { motion } from "framer-motion";
import { ReactElement } from "react";

interface IBackDrop {
    children?: ReactElement | null;
    onClick?: () => void | any;
}

function Backdrop ({ children, onClick } : IBackDrop) {

  return (
    <motion.div
      className="backdrop"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}

export default Backdrop;