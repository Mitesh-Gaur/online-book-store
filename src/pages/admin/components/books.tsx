import React, { ForwardedRef, ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { baseUrl } from '../../../resources/api-constants';
import { admin } from '../../../utility/ApiConfigurations';
import { AnimatePresence, motion } from "framer-motion";
import Modal from './Modal';
import { FloatingInput } from '../../../components';

interface IModalContainer {
  children?: ReactElement | null;
}

function Books() {

  const [info, setInfo] = useState<any>([]);
  const [file, setFile] = useState<string>('');
  const inputRef = useRef<null | HTMLInputElement>(null);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);

  useEffect(() => {
    getAllBooks();
  }, [])

  const getAllBooks = useCallback(async () => {
    const res = await admin.booksApi();
    // console.log(res.data);
    setInfo(res.data)
  }, [setInfo])

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log('fileObj is', fileObj);

    // 👇️ reset file input
    event.target.value = null;

    // 👇️ is now empty
    console.log(event.target.files);

    // 👇️ can still access file object here
    console.log(fileObj);
    setFile(URL.createObjectURL(fileObj));
  };


  return (
    <>
      <section className="body-font overflow-hidden">
        <div className="container px-4 md:px-20 py-4 pb-10 md:py-16 mx-auto">
          <button
            className='bg-gray-800 p-2 px-3 text-white mb-4 font-bold rounded-md'
            onClick={open}
          >
            Add Book
          </button>
          <table className="table-auto w-full text-white">
            <thead className=' border-slate-500 border bg-slate-800'>
              <tr className='text-left'>
                <th className='px-4 py-4'>Book Name</th>
                <th className='px-4 py-4'>Book Author</th>
                <th className='px-4 py-4'>Book Price</th>
                <th className='px-4 py-4'>Book Image</th>
                <th className='px-4 py-4'>Action</th>
              </tr>
            </thead>
            <tbody className=' bg-slate-100 text-gray-800'>
              {
                info.map((book: any) => <Book key={book.book_id} item={book} />)
              }
            </tbody>
          </table>
        </div>

        <ModalContainer>
          {modalOpen ? <Modal
            modalOpen={modalOpen}
            modalTitle={'Add Product'}
            type={'dropIn'}
            handleClose={close}
            handleSubmit={() => { close() }}
            modalSubmitLabel={'Submit'}
          >
            <div className='w-96 p-4 pb-0'>
              <FloatingInput
                inputLabel={'Book Name'}
                inputValue={''}
                onChangeText={() => { }}
                error={''}
              />
              <FloatingInput
                inputLabel={'Book Author'}
                inputValue={''}
                onChangeText={() => { }}
                error={''}
              />
              <FloatingInput
                inputLabel={'Book Price'}
                inputValue={''}
                onChangeText={() => { }}
                error={''}
              />

              <input
                style={{ display: 'none' }}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
              />
              { !file ?
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
            </div>
          </Modal> : null}
        </ModalContainer>
      </section>
    </>
  )
}

function Book({ item }: any) {
  return <tr className='border-slate-500 row-bottomBorder'>
    <td className='px-4 py-2'>{item?.book_name}</td>
    <td className='px-4 py-2'>{item?.book_author}</td>
    <td className='px-4 py-2'>{item?.book_price}</td>
    <td className='px-4 py-2'>
      <img alt="content" className="object-cover object-center h-16 w-16" src={`${baseUrl}static/image/${item?.book_image}`} />
    </td>
    <td className='px-4 py-4'>Edit | Delete</td>
  </tr>
}

function ModalContainer({ children }: IModalContainer) {
  return (
    // Enables the animation of components that have been removed from the tree
    <AnimatePresence
      // Disable any initial animations on children that
      // are present when the component is first rendered
      initial={false}
      // Only render one component at a time.
      // The exiting component will finish its exit
      // animation before entering component is rendered
      mode={'wait'}
      // Fires when all exiting nodes have completed animating out
      onExitComplete={() => { }}
    >
      {children}
    </AnimatePresence>
  )
}

export default Books