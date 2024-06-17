import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { Auth } from '../../../service/utils/auth'
import PreLogin from './PreLogin/PreLogin'

import Header2 from '../../../components/Header/Header2'
import background from '../../../images/bg3.jpg'
import SideBar from './Message/Message'

const HomeLayout = () => {
 const { isLogin } = new Auth()

 const backgroundImageStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  color: 'white',
 }

 const [heightHeader, setHeightHeader] = useState('200')
 const sidebarStyles = {
  height: `calc(100vh - ${heightHeader}px)`,
 }
 const getHeightHeader = (height) => setHeightHeader(height)

 const location = useLocation()
 const isChatPage = location.pathname === '/sidebar'

 if (!isLogin) return <PreLogin />

 return (
  <>
   <div style={backgroundImageStyle} className='hidden sm:block'>
    <Header2 onGetHeight={getHeightHeader} />
    <div className='grid grid-cols-4'>
     <div
      style={{ height: `calc(100vh - ${heightHeader}px)` }}
      className='p-5 col-span-1 overflow-y-scroll overflow-x-hidden hidden sm:block'
      id='sidebar-message'
     >
      <SideBar />
     </div>
     <div className='col-span-3 p-5'>
      <Outlet />
     </div>
    </div>
   </div>

   <div className='lg:hidden md:hidden sm:hidden'>
    {!isChatPage && (
     <>
      <div className='relative z-10'>
       <Outlet />
      </div>
     </>
    )}

    {isChatPage && (
     <div className=''>
      <div className='col-span-3'>
       <SideBar />
      </div>
     </div>
    )}
   </div>
  </>
 )

 //  return (
 //   <div style={backgroundImageStyle}>
 //    <Header2 onGetHeight={getHeightHeader} />
 //    <div className='grid grid-cols-4'>
 //     <div
 //      style={sidebarStyles}
 //      className='p-5 col-span-1 overflow-y-scroll overflow-x-hidden'
 //      id='sidebar-message'
 //     >
 //      <SideBar />
 //     </div>

 //     <div className='col-span-3 p-5'>
 //      <Outlet />
 //     </div>
 //    </div>
 //   </div>
 //  )
}

export default HomeLayout
