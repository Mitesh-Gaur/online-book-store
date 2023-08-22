import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { baseUrl } from '../../../resources/api-constants';
import { admin } from '../../../utility/ApiConfigurations';
import { AnimatePresence, motion } from "framer-motion";
import Modal from './Modal';

function Books() {

  const [info, setInfo] = useState<any>([]);

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

  // const [showModal, setShowModal] = useState<boolean>(false);

  // const onCloseModal = () => {
  //   setShowModal(false);
  // }

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
        {modalOpen ? <Modal modalOpen={modalOpen} text={'dropIn'} type={'dropIn'} handleClose={close} /> : null}
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

interface IModalContainer {
  children?: ReactElement | null;
}

function ModalContainer({ children } : IModalContainer){
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
    onExitComplete={() => {}}
  >
    {children}
  </AnimatePresence>
)
}

export default Books