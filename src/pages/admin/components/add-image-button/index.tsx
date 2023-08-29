import React, { useRef, useImperativeHandle } from "react";

const AddImageButton = React.forwardRef(({
  handleClick,
  file,
  handleFileChange,
  error
}: any, ref) => {
  const addImageRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    click: () => {
      if (addImageRef.current) {
        addImageRef.current.click();
      }
    }
  }), []);

  return (
    <>
      <input
        style={{ display: 'none' }}
        ref={addImageRef}
        type="file"
        onChange={handleFileChange}
      />
      {
        !file ?
          <button
            className='border-2 rounded-md p-4 mb-4 w-32 h-32 flex items-center justify-center'
            onClick={handleClick}
          >
            <span className='text-4xl text-gray-900'>+</span>
          </button> : <img
            src={file}
            className='border rounded-md mb-4 w-32 h-32 flex items-center justify-center'
            onClick={handleClick}
          />
      }
      {!!error.showError && <span className="block -mt-3 mb-4 text-xs text-red-600">{error.message}</span>}
    </>
  )
})
AddImageButton.displayName = "AddImageButton";

export default AddImageButton;