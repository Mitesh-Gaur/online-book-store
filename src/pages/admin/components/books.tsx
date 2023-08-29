import React, { ReactElement, useCallback, useEffect, useRef, useState, CSSProperties } from 'react'
import { baseUrl } from '../../../resources/api-constants';
import { admin } from '../../../utility/ApiConfigurations';
import { AnimatePresence, motion } from "framer-motion";
import Modal from './Modal';
import { FloatingInput } from '../../../components';
import AddImageButton from './add-image-button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BeatLoader from "react-spinners/BeatLoader";
import { IconDelete, IconEdit } from '../../../components/Icons';

interface IModalContainer {
  children?: ReactElement | null;
}

interface IError {
  showError?: boolean;
  message?: string;
}

interface IBookErrorType {
  message?: string;
}

interface IBookError {
  name?: IBookErrorType;
  author?: IBookErrorType;
  price?: IBookErrorType;
}

const override: CSSProperties = {
  display: "block",
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translateX(-50%) translateY(-50%)',
  margin: "0 auto",
  zIndex: 10
};

function Books() {

  const [info, setInfo] = useState<any>([]);
  const [file, setFile] = useState<string>('');

  const [bookName, setBookName] = useState<string>('');
  const [bookAuthor, setBookAuthor] = useState<string>('');
  const [bookPrice, setBookPrice] = useState<string>('');
  const [bookImage, setBookImage] = useState<any>({});

  const [bookError, setBookError] = useState<IBookError>({
    name: { message: ''},
    author: { message: ''},
    price: { message: ''},
  });
  
  const [error, setError] = useState<IError>({
    showError: false,
    message: ''
  });
  const inputRef = useRef<null | HTMLInputElement>(null);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

  const validateFields = () => {
    let hasError = false;
    setError(pre => ({...pre, showError: false, message: ''}))
    setBookError(pre => ({...pre, name: { message: ''}}))
    setBookError(pre => ({...pre, author: { message: ''}}))
    setBookError(pre => ({...pre, price: { message: ''}}))

    if(!file) {
      hasError = true;
      setError(pre => ({...pre, showError: true, message: 'Please enter the image of the book'})) 
    }
    if(!bookName) {
      hasError = true;
      setBookError(pre => ({...pre, name: {
        message: 'Please enter the name of the book'
      }}))
    }
    if(!bookAuthor) {
      hasError = true;
      setBookError(pre => ({...pre, author: {
        message: 'Please enter the name of author of the book'
      }}))
    }
    if(!bookPrice) {
      hasError = true;
      setBookError(pre => ({...pre, price: {
        message: 'Please enter the price of the book'
      }}))
    }
    else if(hasError) { return false }
    else {return true;}
  }

  const handleSubmit = async () => {
    if(!validateFields()) {return;}
    const params = {
      bookName: bookName,
      bookAuthor: bookAuthor,
      bookPrice: parseInt(bookPrice),
      bookImage: bookImage
    }
    console.log(params)
    try {
      setLoading(true);
      const res = await admin.booksAddApi(params, onUploadProgress);
      console.log(res.data);
      notify(res);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
    close();
  }

  const onUploadProgress = (data:any) => {
    console.log(Math.round((100 * data.loaded) / data.total));
  }

  const notify = (response:any) => {
    if (response.status) {
      toast.success(response.message);
      getAllBooks();
    } else {
      toast.error(response.message)
    }
  }

  const didMount = useRef<boolean>(false);
  useEffect(() => {
    if(!didMount.current) {
      didMount.current = true;
    } else {
      validateFields();
    }
  }, [file, bookName, bookAuthor, bookPrice])

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
    setBookImage(fileObj)
  };

  const onBookNameChange = (event:any) => {
    setBookName(event.target.value)
  }
  const onBookAuthorChange = (event:any) => {
    setBookAuthor(event.target.value)
  }
  const onBookPriceChange = (event:any) => {
    setBookPrice(event.target.value)
  }

  return (
    <>
      <section className="body-font overflow-hidden">
        <div className="container px-4 md:px-20 py-20 pb-10 md:py-16 mx-auto">
          <button
            className='bg-gray-800 p-2 px-3 text-white mb-4 font-bold rounded-md'
            onClick={open}
          >
            Add Book
          </button>
          <div className='overflow-x-auto'>
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
        </div>

        <ModalContainer>
          {modalOpen ? <Modal
            modalOpen={modalOpen}
            modalTitle={'Add Book'}
            type={'dropIn'}
            handleClose={close}
            handleSubmit={handleSubmit}
            modalSubmitLabel={'Submit'}
          >
            <div className='w-96 p-4 pb-0'>
              <FloatingInput
                inputLabel={'Book Name'}
                inputValue={bookName}
                onChangeText={onBookNameChange}
                error={bookError.name?.message}
                errorStyle={'block -mt-3'}
              />
              <FloatingInput
                inputLabel={'Book Author'}
                inputValue={bookAuthor}
                onChangeText={onBookAuthorChange}
                error={bookError.author?.message}
                errorStyle={'block -mt-3'}
              />
              <FloatingInput
                inputLabel={'Book Price'}
                inputValue={bookPrice}
                onChangeText={onBookPriceChange}
                error={bookError.price?.message}
                errorStyle={'block -mt-3'}
              />

              <AddImageButton
                handleClick={handleClick}
                file={file}
                ref={inputRef}
                error={error}
                handleFileChange={handleFileChange}
              />
            </div>
          </Modal> : null}
        </ModalContainer>

        <ToastContainer
          position="bottom-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnHover={false}
          pauseOnFocusLoss
          draggable
          theme="colored"
        />

        <BeatLoader
          color="#36d7b7"
          loading={loading}
          size={8}
          cssOverride={override}
        />
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
      <img alt="content" className="object-cover object-center h-16 w-16" src={`${baseUrl}static/upload/admin/${item?.book_image}`} />
    </td>
    <td className='px-4 py-7 flex items-center'>
      <button>
        <IconEdit className='mr-2' />
      </button>
      | <button>
        <IconDelete className='ml-2' />
        </button>
    </td>
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