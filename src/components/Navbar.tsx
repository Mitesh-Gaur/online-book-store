import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../resources/routes-constants';
import '../styles/navbar.sass'

interface IProfileIcon {
  showProfileCard?: boolean;
  onProfileClick?: () => void | any;
  onLogoutClick?: () => void | any;
}

const CartButton = ({cartClass}: any) => {
  return <button
    className={`cursor-pointer hover:text-white ${cartClass}`}
    onClick={() => { }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path
        d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  </button>
};

const UpdateUserIcon = () => {
  return <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="24" cy="11" r="7" fill="none" stroke="#333" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M4 41C4 32.1634 12.0589 25 22 25" stroke="#333" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M31 42L41 32L37 28L27 38V42H31Z" fill="none" stroke="#333" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
}

const ProfileButton = ({onProfileClick, showProfileCard, onLogoutClick}: IProfileIcon) => {
  return <div className='relative'>
  <button 
    className="flex flex-col lg:items-start items-center"
    onClick={onProfileClick}
  >
    <div className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400">
      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </div>
  </button>
    <div className={`absolute -left-28 w-60
    p-4 border rounded custom-transparent-bg
    ${showProfileCard ? 'visible opacity-100 top-10' : 'collapse opacity-0 top-6'}`}
    >
      <div className='flex flex-col items-start'>
        <a
          className="text-gray-800 flex items-center pb-2"
          href={ROUTES.UPDATEPAGE}
        >
          <UpdateUserIcon />
          Update Profile
        </a>
        <hr className='w-full' />
        <button
          className='text-gray-800 pt-2'
          onClick={onLogoutClick}
        >
          Logout
        </button>
      </div>
    </div>
  </div>
}

export default function Navbar() {

  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const [showProfileCard, setShowProfileCard] = useState<boolean>(false);

  useEffect(() => {
    getUserData();
  }, [])

  const getUserData = () => {
    const userData: any = sessionStorage.getItem('user');
    if (userData !== null) {
      const userInfo = JSON.parse(userData);
      if (userInfo?.userId !== null) {
        setUserLoggedIn(true);
        // setData(userData);
      }
    }

  }

  const onLogoutClick = () => {
    sessionStorage.removeItem('user');
    window.location.reload();
  }

  const commonTabList = [
    { key: 1, title: 'Home', url: '/' },
    { key: 2, title: 'Books', url: '/books' },
  ];

  const unSignedTabList = [
    ...commonTabList,
    { key: 3, title: 'Login', url: '/login' },
    { key: 4, title: 'Sign up', url: '/sign-up' },
  ]

  const signedTabList = [
    ...commonTabList,
  ]

  const onProfileClick = () => {
    setShowProfileCard(pre=>!pre);
  }

  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap py-2 md:py-4 md:px-20 flex-row md:flex-row items-center">
        <div className="w-full md:w-auto flex items-center justify-between text-white mb-0 md:mb-0 pr-3">
          <div><span className="ml-3 text-xl title-font font-medium">Online-Book-Store</span></div>
          <button className="inline-flex md:hidden items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-0 md:mt-0">
            <svg style={{ color: 'white' }} height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
              <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2 s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2 S29.104,22,28,22z" fill="white"></path>
            </svg>
          </button>
        </div>
        <nav className="md:ml-auto hidden md:flex flex-wrap items-center text-base justify-center">
          {/* <a className="mr-5 cursor-pointer hover:text-white">First Link</a> */}
          {
            userLoggedIn === false ? unSignedTabList.map((item) => {
              return <a
                key={item.key}
                className="mr-5 cursor-pointer hover:text-white"
                href={item.url}
              >
                {item.title}
              </a>
            }) : signedTabList.map((item) => {
              return <a
                key={item.key}
                className="mr-5 cursor-pointer hover:text-white"
                href={item.url}
              >
                {item.title}
              </a>
            })
          }
          {
            userLoggedIn ? <ProfileButton 
              onProfileClick={onProfileClick}
              onLogoutClick={onLogoutClick}
              showProfileCard={showProfileCard}
            /> : null
          }
          <CartButton
            cartClass={`${userLoggedIn ? 'ml-5' : 'ml-0'}`}
          />
        </nav>
      </div>
    </header>
  )
}
