import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../resources/routes-constants';
import '../styles/navbar.sass'

interface IProfileIcon {
  showProfileCard?: boolean;
  onProfileClick?: () => void | any;
  onLogoutClick?: () => void | any;
}


const LogoutButton = ({ onLogoutClick }: IProfileIcon) => {
  return <div className='relative'>
    <button
      className="flex flex-col lg:items-start items-center"
      onClick={onLogoutClick}
      title="Logout"
    >
      <div className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-gray-800 text-indigo-400">
        <img className=' w-1/2 invert' src='/logoutIcon.svg' />
      </div>
    </button>
  </div>
}

export default function DashboardNavbar({commonTabList, onTabPress}: any) {

  const [hideSidebar, setHideSidebar] = useState<boolean>(true);

  const onLogoutClick = () => {
    sessionStorage.removeItem('user');
    window.location.reload();
  }

  return (
    <>
      <div className={`w-auto fixed top-4 ${hideSidebar ? 'transition-all left-0' : 'transition-all left-56'} flex items-center justify-between text-white mb-0 md:mb-0 px-3`}>
        <button 
          className="inline-flex md:hidden items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-0 md:mt-0"
          onClick={() => {
            if(hideSidebar) {
              setHideSidebar(false);
            } else {
              setHideSidebar(true);
            }
          }}
        >
          <svg style={{ color: 'white' }} height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <path d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2 s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2 S29.104,22,28,22z" fill="white"></path>
          </svg>
        </button>
      </div>

      <aside
        className={`text-gray-400 fixed bg-gray-900 body-fon h-screen duration-300 transform ${hideSidebar ? 'w-0' : 'w-60'} md:w-72 z-10 origin-[0]`}
      >
        <div className={`container mx-auto flex flex-wrap py-2 md:py-4 flex-col items-center md:visible ${hideSidebar ? 'invisible' : 'visible' }`}>
          <div>
            <p className="mt-3 text-xl title-font font-medium">Online-Book-Store</p>
          </div>
          <nav className="flex flex-col items-center text-base justify-center pt-16">
            {
              commonTabList.map((item:any) => {
                return <a
                  key={item.id}
                  className="cursor-pointer hover:text-white block w-full py-3 border border-white px-16 mb-8 rounded-xl text-center"
                  onClick={() => onTabPress(item.id)}
                >
                  {item.title}
                </a>
              })
            }
            {/* {
            userLoggedIn ? <LogoutButton
              onLogoutClick={onLogoutClick}
            /> : null
          } */}
          </nav>
        </div>
      </aside>
    </>
  )
}
