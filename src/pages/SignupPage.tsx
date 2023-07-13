import React, { useEffect, useRef, useState, CSSProperties  } from 'react'
import { Button, FloatingInput, Navbar } from '../components'
import { signUpApi } from '../utility/ApiConfigurations';
import { ValidateEmail, ValidatePassword, ValidatePhone } from '../utility/functions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BeatLoader  from "react-spinners/BeatLoader";
import { ROUTES } from '../resources/routes-constants';

interface StateProps {
  email?: string;
  mobile?: string;
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

const SignupPage: React.FC = () => {

  const [showSignupButton, setShowSignupButton] = useState<boolean>(false);
  const [state, setState] = useState<StateProps>({
    email: '',
    mobile: '',
    password: ''
  });

  const [emailError, setEmailError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const didMount = useRef(false);
  const errorRef = useRef(false);
  const signupRef = useRef(false);
  const passRef = useRef(false);

  const onNextTap = () => {
    setShowSignupButton(true);
  }

  const validateInputs = () => {
    if (state.email === '') {
      setEmailError('Please enter your email address')
    } else if (!ValidateEmail(state.email)) {
      setEmailError('Please enter valid email address')
    } else {
      setEmailError('')
    }

    if (state.mobile === '') {
      setPhoneError('Please enter your phone number')
    } else if (!ValidatePhone(state.mobile)) {
      setPhoneError('Please enter valid phone number')
    }
    else {
      setPhoneError('')
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
    if (emailError === '' && phoneError === '') {
      if (showSignupButton) {
        if (passwordError === '') {
          setDisabled(false);
        } else {
          setDisabled(true);
        }
      } else {
        setDisabled(false);
      }
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
  }, [emailError, phoneError])

  useEffect(() => {
    if (passRef.current === false) {
      passRef.current = true;
    } else {
      onFormBlur()
    }
  }, [passwordError])

  useEffect(() => {
    if (signupRef.current === false) {
      signupRef.current = true;
    } else {
      setDisabled(true);
    }
  }, [showSignupButton])

  const onEmailChange = (e: any) => {
    setState(pre => ({ ...pre, email: e.target.value }))
  }

  const onMobileChange = (e: any) => {
    setState(pre => ({ ...pre, mobile: e.target.value }))
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
  }, [state.email, state.mobile, state.password])

  const onSignUpTap = async () => {
    const params = {
      email: state.email,
      mobileNo: state.mobile,
      password: state.password
    }
    setLoading(true);
    const res = await signUpApi(params);
    setLoading(false);
    // console.log(res);
    notify(res.message, res.status);
    // console.log(res.data);
  }

  const notify = (message:string, status:boolean) => {
    if(status) {
      toast.success(message)
    } else {
      toast.error(message)
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
          <h2 className="text-gray-900 text-lg mb-1 font-bold title-font text-center">Registration</h2>

          <FloatingInput
            inputLabel={'Email Address'}
            inputValue={state.email}
            onChangeText={onEmailChange}
            error={emailError}
          />

          <FloatingInput
            inputLabel={'Mobile No.'}
            inputValue={state.mobile}
            onChangeText={onMobileChange}
            error={phoneError}
          />

          {
            showSignupButton ? <FloatingInput
              inputLabel={'Password'}
              inputValue={state.password}
              onChangeText={onPasswordChange}
              inputType={'password'}
              error={passwordError}
            /> : null
          }

          {
            showSignupButton ? <Button
              title='Sign up'
              disabled={disabled}
              onPress={onSignUpTap}
            /> : <Button
              title='Next'
              disabled={disabled}
              onPress={onNextTap}
            />
          }
          <p className="mx-auto text-xs text-gray-400 text-opacity-90 mt-3 font-bold">Already registered, Please <a href={ROUTES.LOGINPAGE} className='text-gray-900'>Login</a></p>
        </form>

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
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

export default SignupPage