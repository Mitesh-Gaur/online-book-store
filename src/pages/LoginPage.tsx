import React, { useEffect, useRef, useState, CSSProperties } from 'react'
import { Button, FloatingInput, Navbar } from '../components'
import { loginApi } from '../utility/ApiConfigurations';
import { ValidateEmail, ValidatePassword } from '../utility/functions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BeatLoader from "react-spinners/BeatLoader";
import { ROUTES } from '../resources/routes-constants';
import { useNavigate } from 'react-router-dom';

interface StateProps {
  email?: string;
  password?: string;
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

const LoginPage: React.FC = () => {

  const [state, setState] = useState<StateProps>({
    email: '',
    password: ''
  });

  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const didMount = useRef(false);
  const errorRef = useRef(false);
  const signupRef = useRef(false);

  const navigation = useNavigate()

  const validateInputs = () => {
    if (state.email === '') {
      setEmailError('Please enter your email address')
    } else if (!ValidateEmail(state.email)) {
      setEmailError('Please enter valid email address')
    } else {
      setEmailError('')
    }

    if (state.password === '') {
      setPasswordError('Please enter your password')
    } else if (!ValidatePassword(state.password)) {
      setPasswordError('The mininum password length is 6')
    }
    else {
      setPasswordError('')
    }
  }

  const onFormBlur = () => {
    validateInputs();
    if (emailError === '' && passwordError === '') {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  useEffect(() => {
    if (errorRef.current === false) {
      errorRef.current = true;
    } else {
      onFormBlur()
    }
  }, [emailError, passwordError])

  const onEmailChange = (e: any) => {
    setState(pre => ({ ...pre, email: e.target.value }))
  }

  const onPasswordChange = (e: any) => {
    setState(pre => ({ ...pre, password: e.target.value }))
  }

  useEffect(() => {
    if (didMount.current === false) {
      didMount.current = true;
    } else {
      onFormBlur();
    }
  }, [state.email, state.password])

  const onLoginTap = async () => {
    const params = {
      email: state.email,
      password: state.password
    }
    console.log('login-params->', params);
    setLoading(true);
    const res = await loginApi(params);
    setLoading(false);
    console.log(res);
    notify(res);
    // console.log(res.data);
  }

  const notify = (response:any) => {
    if (response.status) {
      toast.success(response.message);
      setTimeout(() => {
        sessionStorage.setItem('user', JSON.stringify(response.data))
        navigation(ROUTES.HOMEPAGE_ROUTE);
      }, 2000)
    } else {
      toast.error(response.message)
    }
  }
  return (
    <>
      <Navbar />

      <div className="container px-5 py-4 mx-auto flex">
        <form onSubmit={(e: any) => e.preventDefault()}
          className="lg:w-1/3 md:w-1/2 bg-white border border-gray-100 shadow-xl rounded-lg p-8 flex flex-col mx-auto w-full mt-10 md:mt-0 relative z-10"
          onBlur={onFormBlur}
        >
          <h2 className="text-gray-900 text-lg mb-1 font-bold title-font text-center">Login</h2>

          <FloatingInput
            inputLabel={'Email Address'}
            inputValue={state.email}
            onChangeText={onEmailChange}
            error={emailError}
          />

          <FloatingInput
            inputLabel={'Password'}
            inputValue={state.password}
            onChangeText={onPasswordChange}
            inputType={'password'}
            error={passwordError}
          />

          <Button
            title='Login'
            disabled={disabled}
            onPress={onLoginTap}
          />
          <p className="mx-auto text-xs text-gray-400 text-opacity-90 mt-3 font-bold">Not registered, Please <a href={ROUTES.SIGNUPPAGE} className='text-gray-900'>Sign up</a></p>
        </form>

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
      </div>
    </>
  )
}

export default LoginPage