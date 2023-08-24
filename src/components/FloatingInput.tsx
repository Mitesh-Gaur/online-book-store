import React from "react";

interface InputLabelType {
  inputLabel?: string;
  inputValue?: string;
  inputType?: string;
  onChangeText?: React.ChangeEventHandler,
  onBlur?: React.ChangeEventHandler,
  error?: string
}

const FloatingInput = ({inputLabel, inputValue, inputType, onChangeText, error, onBlur}: InputLabelType) => {
  return (
    <>
    <div className="relative mb-4">
      <input 
        type={`${inputType ?? 'text'}`}
        id={`floating_outlined_${inputLabel}`}
        name={`fo_${inputLabel}`}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-900 placeholder-transparent peer" 
        placeholder={inputLabel}
        value={inputValue}
        onChange={onChangeText}
        onBlur={onBlur}
      />
      <label 
        htmlFor="floating_outlined" 
        className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >{inputLabel}</label>
    </div>
    {error !== '' ? <span
      className="transition-all text-xs -mt-4 mb-4 text-red-600"
    >
      {error}
    </span> : null
    }
    </>
  )
}

export default FloatingInput