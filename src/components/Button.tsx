import React from 'react';

interface ButtonProps {
    title?: string;
    onPress?: () => void | any;
    disabled?: boolean
}

const Button = ({title, onPress, disabled}: ButtonProps) => {
    return <button 
    className={`text-white 
    bg-gray-900 border-0 py-2 px-6 
    focus:outline-none hover:bg-gray-800 
    rounded text-lg disabled:opacity-75 disabled:hover:bg-gray-900`}
    onClick={onPress}
    disabled={disabled}
  >
    {title}
  </button>
}

export default Button;